from celery import Celery
from celery.task import periodic_task
from datetime import timedelta

app = Celery("reddit_dashboard")


# celery -A reddit_dashboard beat -l info
# celery -A reddit_dashboard worker --pool=solo -l info // for windows

@periodic_task(run_every=timedelta(seconds=15))
def task():
    print("Task working!")

