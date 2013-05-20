var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-21592891-1']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function() {
  $('#close-options').click(function(){
    $('.options-panel').hide('normal', function() { $('.options-panel-closed').show('normal'); });
    return false;
  });
  $('.options-panel-closed a').click(function(){
    $('.options-panel-closed').hide('normal',function() {$('.options-panel').show('normal');});
    return false;
  });
  
  $('.options-panel a').click(function(){
    var href= $(this).attr('href');
    if (href.indexOf('switcher') != -1 && href.indexOf('style=') != -1) {
      type = href.match(/css\/(.*)\//)[1];
      option = href.match(/style=(.*)/)[1];

      try {
        _gaq.push(['_trackEvent', type, option]); 
      } catch(err){}
 
      setTimeout(function() {
        document.location.href = href;
      }, 100);
    } // if switch link
  });
});