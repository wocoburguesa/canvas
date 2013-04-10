# -*- coding: utf-8 -*-

from django.shortcuts import render

from early_registration.forms import EarlyAdopterForm
from early_registration.models import EarlyAdopter

def landing_view(request, template_name=None):
    context = {}

    if request.method == 'POST':
        form = EarlyAdopterForm(request.POST)
        if form.is_valid():
            new_record = EarlyAdopter(
                email = form.cleaned_data['email']
                )
            new_record.save()
    else:
        form = EarlyAdopterForm()

    context['form'] = form

    return render(
        request,
        template_name,
        context
        )
