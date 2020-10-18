import praw
from praw.exceptions import PRAWException
from django.conf import settings
from reddit_dashboard.models import Subreddit
from reddit_dashboard.models import DashboardUser
import json

class RedditManager:
    instance = None

    def __init__(self):
        self.instance = self.get_instance()

    @staticmethod
    def get_instance():
        return praw.Reddit(client_id=settings.PRAW_CLIENT_ID,
                           client_secret=settings.PRAW_SECRET,
                           user_agent=settings.PRAW_USER_AGENT,
                           redirect_uri=settings.PRAW_REDIRECT_URL)

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

    def get_refresh_token(self, code):
        return self.instance.auth.authorize(code)

    def get_auth_link(self, username):
        return self.instance.auth.url(["identity", "mysubreddits"], username, "permanent")

    @staticmethod
    def get_user_instance(user=None, username=None, refresh_token=None):
        if not user and not refresh_token:
            user = DashboardUser.objects.get(username=username)

        if not refresh_token:
            refresh_token = user.reddit_user_id

        temporary_instance = praw.Reddit(
            client_id=settings.PRAW_CLIENT_ID,
            client_secret=settings.PRAW_SECRET,
            user_agent=settings.PRAW_USER_AGENT,
            refresh_token=refresh_token
        )

        return temporary_instance

    def get_user_data(self, user=None, username=None, instance=None):
        if not instance:
            if not user:
                user = DashboardUser.objects.get(username=username)
            instance = self.get_user_instance(user=user)

        user.reddit_user_data = json.dumps(instance.user.me().subreddit)
        user.save()  # save changes

        return user.reddit_user_data

    def get_user_subreddits(self, user=None, username=None):
        if not user:
            user = DashboardUser.objects.get(username=username)

        return self.get_user_instance(user=user).user.subreddits()






reddit_manager = RedditManager() # singleton object



