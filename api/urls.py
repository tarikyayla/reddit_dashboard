from django.urls import path
from api.views.public import api_check, get_api_token
from api.views import user


urlpatterns = [
    path("hello/", api_check),
    path("get-api-token", get_api_token, name="get_api_token"),
    path("get_subreddits", user.GetSubreddits.as_view(), name="get_subreddits")
]
