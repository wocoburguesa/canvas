# -*- coding: utf-8 -*-

from django.conf.urls.defaults import patterns, url
from early_registration.views import *

urlpatterns = patterns(
    'early_registration.views',
    url(r'^$',
        landing_view,
        {'template_name': 'website/landing_page.html',
         'post_landing_url': 'post-landing'},
        name='landing'),
    url(r'^thank-you/$',
        post_landing,
        {'template_name': 'website/post_landing.html'},
        name='post-landing'),
)
