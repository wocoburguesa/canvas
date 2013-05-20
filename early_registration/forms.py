# -*- coding: utf-8 -*-

from django.forms import ModelForm, EmailField, TextInput
from django.utils.translation import ugettext_lazy as _

from early_registration.models import EarlyAdopter
from early_registration import strings, validators

class EarlyAdopterForm(ModelForm):

    email = EmailField(
        widget=TextInput(
            attrs={
                'type': 'text',
                'class': 'span2',
                'placeholder': 'Tu e-mail aquí'
                }
            ),
        label=_("E-mail"),
        validators=[validators.validate_registered_email]
        )

    class Meta:
        model = EarlyAdopter
        fields = ('email',)
