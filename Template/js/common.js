/*
 * Visceral
 * (c) 2013, Web factory Ltd
 */
 
$(function() {
  // top bar open/close
  $('#spade').toggle(function() {
    $('#top').animate({ marginTop: '-147px' }, 500);
    return false;
  },
    function() {
      $('#top').animate({ marginTop: '0' }, 500);
      return false;
  });
  
  // blockquote rotator
  $('section blockquote').quovolver(500, 6000);
  
  // flex slider
  if ($('#main-slider').length) {
    $('#main-slider').flexslider({
      animation: "fade",
      directionNav: true,
      controlNav: false,
      pauseOnAction: true,
      pauseOnHover: true,
      direction: "horizontal",
      slideshowSpeed: 7500
    });
  }

  // gallery slider
  $('#gallery-slider').flexslider({
    animation: 'slide',
    controlsContainer: '.flex-container'
  });
  
  // gmap init
  $('.gmap').each(function(index, element) {
    var gmap = $(element);
    var addr = 'http://maps.google.com/maps?hl=en&ie=utf8&output=embed&sensor=true&iwd=1&mrt=loc&t=m&q=' + encodeURIComponent(gmap.attr('data-address'));
    addr += '&z=' + gmap.attr('data-zoom');
    if (gmap.attr('data-bubble') == 'true') {
      addr += '&iwloc=addr';
    } else {
      addr += '&iwloc=near';
    }
    gmap.attr('src', addr);
  });

  // main dropdown menu
  $('ul#main-navigation li').hover(function(){
      $(this).children('ul').delay(20).fadeIn(200);
    }, function(){
      $(this).children('ul').delay(20).fadeOut(200);
  });
  
  // generate mobile menu
  if ($('#main-menu-select').length && $('#main-menu-select').attr('data-autogenerate') == 'true') {
    var mobile_menu = $('#main-menu-select');
    $('#main-navigation li a').each(function(index, elem) {
      mobile_menu.append($('<option></option>').val($(elem).attr('href')).html($(elem).html()));
    });
  }
  
  // mobile menu click
  $('#main-menu-select').change(function() {
    link = $(this).val();
    if (!link) {
      return;
    }  
    document.location.href = link;
  });

  // lightbox gallery
  $("a[data-gal^='prettyPhoto']").prettyPhoto({social_tools: false, deeplinking: false});

  // links & icons hover effects
  $('#social a, .logo-small').css('opacity', '.35');
  $('#social a, .logo-small').hover(
    function () {
      $(this).stop().animate({ opacity: 1 }, 'normal');
    },
    function () {
      $(this).stop().animate({ opacity: .35 }, 'normal');
  });
    
  $('.over').css('opacity', '0');
  $('.over').hover(
    function () {
       $(this).stop().animate({ opacity: 1 }, 'slow');
    },
    function () {  
       $(this).stop().animate({ opacity: 0 }, 'slow');
  });
  
  // hide default values in newslleter form
  $('#newsletter-name').attr('data-default', $('#newsletter-name').val());
  $('#newsletter-name').focus(function() {
    if($(this).val() == $(this).attr('data-default')) {
      $(this).val('');
    }
  });
  $('#newsletter-name').focusout(function() {
    if(!$(this).val()) {
      $(this).val($(this).attr('data-default'));
    }
  });
  $('#newsletter-email').attr('data-default', $('#newsletter-email').val());
  $('#newsletter-email').focus(function() {
    if($(this).val() == $(this).attr('data-default')) {
      $(this).val('');
    }
  });
  $('#newsletter-email').focusout(function() {
    if(!$(this).val()) {
      $(this).val($(this).attr('data-default'));
    }
  });
  
  // init newsletter subscription AJAX handling
  if ($('#newsletter-form').length) {
    if ($('#newsletter-form').attr('data-mailchimp') == 'true') {
      $('#newsletter-form').attr('action', '_newsletter-subscribe-mailchimp.php');
      $('#newsletter-form').ajaxForm({ dataType: 'json',
                                       timeout: 2000,
                                       success: newsletterResponseMailchimp});
    } else {
      $('#newsletter-form').attr('action', '_newsletter-subscribe.php');
      $('#newsletter-form').ajaxForm({ dataType: 'json',
                                      timeout: 2000,
                                      success: newsletterResponse});
    }
    $('#button-newsletter').click(function() { $('#newsletter-form').submit(); return false; });
  } // if newsletter form
  
  // load captcha question for contact form
  if ($('#captcha-img').length) {
    $.get('_captcha.php?generate', function(response) {
      $('#captcha-img').html(response);
    }, 'html');
  }
  
  // contact form
  if ($('#contact_form').length > 0) {
    $('#contact_form').validate({ rules: { name: { required: true},
                                          email: { required: true, email: true },
                                          message: { required: true },
                                          captcha: { required: true, remote: '_captcha.php' }},
                                 messages: { name: 'This field is required.',
                                             email: { required: 'This field is required.',
                                                      email: 'Please enter a valid email address.'},
                                             message: 'This field is required.',
                                             captcha: 'Are you really a human?'},
                                 submitHandler: function(form) {  $(form).ajaxSubmit({ dataType: 'json',
                                                                                        success: contactFormResponse }); }
                              });
  } // if contact form
}); // onload

// handle contact form AJAX response
function contactFormResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'notsent') {
      alert('We are having some mail server issues. Please refresh the page or try again later.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for contacting us! We\'ll get back to you ASAP.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
  
  location.reload(true);
} // contactFormResponse

// handle newsletter subscribe AJAX response
function newsletterResponse(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'fileopen') {
      alert('Error opening $emailsFile. Please refer to documentation for help.');
    } else if (response.responseMsg == 'name') {
      alert('Please enter a valid name.');
    } else if (response.responseMsg == 'email') {
      alert('Please enter a valid email address.');
    } else if (response.responseMsg == 'duplicate') {
      alert('You are already subscribed to our newsletter.');
    } else if (response.responseMsg == 'filewrite') {
      alert('Error writing to $emailsFile. Please refer to documentation for help.');
    } else {
      alert('Undocumented error. Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for subscribing to our newsletter! We will not abuse your address.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
} // newsletterResponse

// handle newsletter subscribe AJAX response - Mailchimp ver
function newsletterResponseMailchimp(response) {
  if (response.responseStatus == 'err') {
    if (response.responseMsg == 'ajax') {
      alert('Error - this script can only be invoked via an AJAX call.');
    } else if (response.responseMsg == 'name') {
      alert('Please enter a valid name.');
    } else if (response.responseMsg == 'email') {
      alert('Please enter a valid email address.');
    } else if (response.responseMsg == 'listid') {
      alert('Invalid MailChimp list name.');
    } else if (response.responseMsg == 'duplicate') {
      alert('You are already subscribed to our newsletter.');
    } else {
      alert('Undocumented error (' + response.responseMsg + '). Please refresh the page and try again.');
    }
  } else if (response.responseStatus == 'ok') {
    alert('Thank you for subscribing! Please confirm your subscription in the email you\'ll receive shortly.');
  } else {
    alert('Undocumented error. Please refresh the page and try again.');
  }
} // newsletterResponseMailchimp