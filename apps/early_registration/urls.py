# -*- coding: utf-8 -*-

from django.conf.urls.defaults import patterns, url
from early_registration.views import landing_view

urlpatterns = patterns(
    'early_registration.views',
    url(r'^$',
        landing_view,
        {'template_name': 'website/landing_page.html'},
        name='landing'),
)
