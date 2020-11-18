from celery.task import periodic_task
from datetime import timedelta
from reddit_dashboard.models import TextChannel, Posts
from api.reddit.manager import reddit_manager

# celery -A reddit_dashboard beat -l info
# celery -A reddit_dashboard worker --pool=solo -l info // for windows


#@periodic_task(timedelta(minutes=15))
def get_hot_posts():
    following_subreddits = []
    for rel_data in TextChannel.following_subreddits.through.objects.all():
        if rel_data.subreddit not in following_subreddits:
            following_subreddits.append(rel_data.subreddit)

    for following_subreddit in following_subreddits:
        subreddit = reddit_manager.get_subreddit(display_name=following_subreddit.name)

        for submission in subreddit.hot():
            try:
                Posts.create(submission, subreddit=following_subreddit)
            except Exception as ex:
                print(ex)







