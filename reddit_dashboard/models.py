from django.contrib.auth.models import AbstractBaseUser
from django.db import models


class DashboardUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=255)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    reddit_user_data = models.TextField(blank=True, null=True)
    reddit_user_id = models.CharField(blank=True, null=True, max_length=255)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
