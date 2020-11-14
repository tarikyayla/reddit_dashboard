from django.urls import path, include
from api.views.public import api_check, get_api_token
from api.views import user, discord
from rest_framework.routers import DefaultRouter


router = DefaultRouter(trailing_slash=False)

router.register(r'subreddits', user.Subreddits, basename="subreddits")
router.register(r'text-channels', discord.TextChannels, basename='text-channels')


urlpatterns = [
    path("hello/", api_check),
    path("get-api-token", get_api_token, name="get_api_token"),
    path("", include(router.urls)),
    path("refresh-subreddits", user.RefreshSubreddits.as_view(), name="refresh_subreddits"),
    path("reddit-auth", user.RedditAuth.as_view(), name="reddit_auth"),
    path('search-subreddits', user.SearchSubreddit.as_view(), name='search-auth'),
    path('discord', discord.DiscordChannels.as_view(), name='discord-channels'),
]
