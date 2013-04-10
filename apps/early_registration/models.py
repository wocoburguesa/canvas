#-*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

class EarlyAdopter(models.Model):

    email = models.EmailField(_('e-mail address'))

    def __unicode__(self):
        return u'%s' % (self.email)
