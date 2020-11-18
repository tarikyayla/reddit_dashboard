from django.contrib import admin
from reddit_dashboard.models import DashboardUser, Subreddit, SentPosts, Posts, DiscordServer

admin.site.register(DashboardUser)
admin.site.register(Subreddit)
admin.site.register(SentPosts)
admin.site.register(Posts)
admin.site.register(DiscordServer)
