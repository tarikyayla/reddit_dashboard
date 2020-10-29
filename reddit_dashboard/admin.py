from django.contrib import admin
from reddit_dashboard.models import DashboardUser, Subreddit

admin.site.register(DashboardUser)
admin.site.register(Subreddit)
