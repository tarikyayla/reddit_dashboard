from django.db import models
from reddit_dashboard.models import DashboardUser
# Create your models here.


class Subreddit(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    subscribers = models.BigIntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    added_date = models.DateField(auto_now=True)
    added_by = models.ForeignKey(DashboardUser, on_delete=models.DO_NOTHING)
    last_checked_date = models.DateTimeField()

    def __str__(self):
        return self.name


class DiscordServer(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    server_id = models.CharField(max_length=1000, blank=False, null=False)
    text_channel = models.CharField(max_length=255, blank=False, null=False)
    subreddits = models.ManyToManyField(Subreddit)
    added_by = models.ForeignKey(DashboardUser, on_delete=models.DO_NOTHING)
    create_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name







