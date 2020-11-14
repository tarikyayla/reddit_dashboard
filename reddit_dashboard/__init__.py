import logging
from .celery_loader import app as celery_app

__all__ = ('celery_app',)
logger = logging.getLogger(name="reddit_dashboard")
