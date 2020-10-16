import praw
from django.conf import settings


class RedditManager:
    def __init__(self):
        self.get_instance()

    @staticmethod
    def get_instance():
        return praw.Reddit(client_id=settings.PRAW_CLIENT_ID,
                           client_secret=settings.PRAW_SECRET,
                           user_agent=settings.PRAW_USER_AGENT)


# TODO Reddit Auth2
# get user
