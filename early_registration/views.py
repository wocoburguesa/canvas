# -*- coding: utf-8 -*-

from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse

from early_registration.forms import EarlyAdopterForm
from early_registration.models import EarlyAdopter

def landing_view(request, template_name=None,
                 post_landing_url=None):
    context = {}
    form_error = None

    if request.method == 'POST':
        form = EarlyAdopterForm(request.POST)
        if form.is_valid():
            new_record = EarlyAdopter(
                email = form.cleaned_data['email']
                )
            new_record.save()
            if post_landing_url:
                return redirect(reverse(post_landing_url))

        else:
            form_error = form.errors.items()[0][1][0]
            if form_error == 'Enter a valid email address.':
                form_error = 'Ingresa una dirección de e-mail válida'
            
    else:
        form = EarlyAdopterForm()

    context['form'] = form
    if form_error:
        context['form_error'] = form_error

    return render(
        request,
        template_name,
        context
        )

def post_landing(request, template_name=None):
    context = []
    return render(
        request,
        template_name,
        context
        )
