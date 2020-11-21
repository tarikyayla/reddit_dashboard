import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "reddit_dashboard.settings")
app = Celery("reddit_dashboard",
             include=['reddit_dashboard.tasks'])
app.config_from_object('django.conf:settings', namespace='CELERY')

