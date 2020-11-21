from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie
from api.reddit.manager import reddit_manager
from django.http.response import HttpResponseNotFound, HttpResponse, HttpResponseRedirect
from reddit_dashboard.models import DashboardUser, DiscordServer
from django.conf import settings

@ensure_csrf_cookie
def dashboard(requests):
    return render(requests, "index.html")


def reddit_callback(request):
    state = request.GET["state"]
    code = request.GET["code"]

    if settings.USERNAME == state:
        user = DashboardUser.objects.get(username=state)
        user.reddit_user_id = reddit_manager.get_refresh_token(code)
        user.save()
        reddit_manager.get_user_data(user=user)
        return HttpResponseRedirect("/")
    else:
        return HttpResponseNotFound()


def discord_callback(request):
    return HttpResponseRedirect("/")
