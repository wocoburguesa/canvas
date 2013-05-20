# -*- coding: utf-8 -*-

from django.core.exceptions import ValidationError

from early_registration.models import EarlyAdopter
from early_registration import strings

def validate_registered_email(email):
    try:
        user = EarlyAdopter.objects.get(email=email)
        raise ValidationError(
            strings.EMAIL_ALREADY_REGISTERED % {'email': email}
            )
    except EarlyAdopter.DoesNotExist:
        pass
