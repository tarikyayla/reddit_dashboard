from rest_framework import serializers
from reddit_dashboard.models import Subreddit


class SubredditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subreddit
        exclude = ('description',)


