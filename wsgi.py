import sys, os

sys.path.insert(1, '/var/www/canvas-dev.com/canvas')
sys.path.insert(0, '/var/www/canvas-dev.com')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'canvas.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
