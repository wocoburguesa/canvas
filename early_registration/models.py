#-*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

from early_registration import strings

class EarlyAdopter(models.Model):

    email = models.EmailField(strings.EMAIL_FIELD)

    def __unicode__(self):
        return u'%s' % (self.email)
