# -*- coding: utf-8 -*-

from django.conf.urls.defaults import patterns, url
from website.views import landing_view


urlpatterns = patterns(
    'website.views',
    url(r'^$',
        landing_view,
        {'template_name': 'website/landing_page.html'},
        name='landing'),
)
