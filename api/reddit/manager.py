import praw
from praw.exceptions import PRAWException
from django.conf import settings
from api.models import Subreddit


class RedditManager:
    instance = None
    def __init__(self):
        self.instance = self.get_instance()

    @staticmethod
    def get_instance():
        return praw.Reddit(client_id=settings.PRAW_CLIENT_ID,
                           client_secret=settings.PRAW_SECRET,
                           user_agent=settings.PRAW_USER_AGENT)

    def search_by_subreddit(self, search_text):
        return self.instance.subreddits.search_by_name(search_text)

    def get_subreddit(self, display_name):
        return self.instance.subreddit(display_name)

    def add_subreddit(self, display_name, user):
        subreddit = self.get_subreddit(display_name)
        if not subreddit:
            raise PRAWException

        subreddit_object = Subreddit(
            name=subreddit.display_name,
            type=subreddit.subreddit_type,
            added_by=user,
            last_checked_date=subreddit.url,
            description=subreddit.description,
            subscribers=subreddit.subscribers,
        )

        subreddit_object.save()

        return subreddit_object

    def get_user_subreddits(self, user_id):
        pass
