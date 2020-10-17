from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.db import models


class DashboardUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    reddit_user_data = models.TextField(blank=True, null=True)
    reddit_user_id = models.CharField(blank=True, null=True, max_length=255)
    reddit_username = models.CharField(blank=True, null=True, max_length=255)

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username

    objects = UserManager()
