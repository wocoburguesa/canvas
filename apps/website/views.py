# -*- coding: utf-8 -*-

from django.shortcuts import render

def landing_view(request, template_name=None):
    context = {}
    return render(
        request,
        template_name,
        context
        )
