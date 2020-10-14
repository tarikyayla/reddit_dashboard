from django.db import models
from django.contrib.auth.models import User, AbstractUser
# Create your models here.





class Subreddit(models.Model):
    subreddit_id = models.CharField(max_length=1000)
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    added_date = models.DateField(auto_now=True)
    added_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    last_checked_date = models.DateTimeField()


class DiscordServer(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    server_id = models.CharField(max_length=1000, blank=False, null=False)
    text_channel = models.CharField(max_length=255, blank=False, null=False)
    subreddits = models.ManyToManyField(Subreddit, null=True, blank=True)
    added_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    create_date = models.DateTimeField(auto_now=True)







