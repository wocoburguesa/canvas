# -*- coding: utf-8 -*-

from django.forms import ModelForm, EmailField, TextInput
from django.utils.translation import ugettext_lazy as _

from early_registration.models import EarlyAdopter

class EarlyAdopterForm(ModelForm):

    email = EmailField(
        widget=TextInput(
            attrs={
                'type': 'text',
                'class': 'input-block-level',
                'placeholder': 'Tu e-mail aquí'
                }
            ),
        label=_("E-mail")
        )

    class Meta:
        model = EarlyAdopter
        fields = ('email',)
