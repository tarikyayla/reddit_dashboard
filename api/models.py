from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Subreddit(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    added_date = models.DateField(auto_now=True)
    added_by = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    last_checked_date = models.DateTimeField()



