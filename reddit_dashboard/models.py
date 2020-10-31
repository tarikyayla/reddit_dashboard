from django.contrib.auth.models import AbstractBaseUser, UserManager
from django.db import models
from django.utils.timezone import now


class DashboardUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)
    reddit_user_data = models.TextField(blank=True, null=True)
    reddit_user_id = models.CharField(blank=True, null=True, max_length=255)
    reddit_username = models.CharField(blank=True, null=True, max_length=255)
    subreddits = models.ManyToManyField('Subreddit')
    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return self.username

    def add_subreddits_to_user(self, subreddit_list):
        for subreddit in subreddit_list:
            self.add_subreddit_to_user(subreddit)

    def add_subreddit_to_user(self, subreddit):
        sub = Subreddit.objects.filter(name=subreddit.display_name).first()
        if not sub:
            sub = Subreddit(
                name=subreddit.display_name,
                url=subreddit.url,
                description=subreddit.description_html,
                added_by=self,
                subscribers=subreddit.subscribers,
                type=subreddit.subreddit_type,
                last_checked_date=now(),
                banner_img=subreddit.banner_img,
                icon_img=subreddit.icon_img,
                over18=subreddit.over18
            )
            sub.save()
        exist = self.subreddits.filter(name=sub.name).first()
        if not exist:
            self.subreddits.add(sub)
            self.save()

    def add_subreddit_obj_to_user(self, subreddit):
        exist = self.subreddits.filter(pk=subreddit.id).first()

        if not exist:
            self.subreddits.add(subreddit)

    def subreddit_exist(self, subreddit=None, subreddit_id=None):
        if not subreddit:
            subreddit = Subreddit.objects.filter(pk=subreddit_id).first()

            if not subreddit:
                raise Exception("Subreddit not exist!")

        return self.subreddits.filter(pk=subreddit.id).first()

    def unfollow_subreddit(self, subreddit):
        exist = self.subreddit_exist(subreddit)

        if exist:
            self.subreddits.remove(exist)

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @property
    def is_admin(self):
        return self.is_superuser


class Subreddit(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    subscribers = models.BigIntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    added_date = models.DateField(auto_now=True)
    added_by = models.ForeignKey(DashboardUser, on_delete=models.DO_NOTHING)
    last_checked_date = models.DateTimeField()
    banner_img = models.CharField(max_length=500, blank=True, null=True)
    icon_img = models.CharField(max_length=500, blank=True, null=True)
    over18 = models.BooleanField(default=False)

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
