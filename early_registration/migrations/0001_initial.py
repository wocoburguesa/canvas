# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'EarlyAdopter'
        db.create_table(u'early_registration_earlyadopter', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
        ))
        db.send_create_signal(u'early_registration', ['EarlyAdopter'])


    def backwards(self, orm):
        # Deleting model 'EarlyAdopter'
        db.delete_table(u'early_registration_earlyadopter')


    models = {
        u'early_registration.earlyadopter': {
            'Meta': {'object_name': 'EarlyAdopter'},
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['early_registration']