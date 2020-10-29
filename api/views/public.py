from django.shortcuts import render
from django.http.response import JsonResponse
from django.contrib.auth.decorators import login_required
from reddit_dashboard.utils.user_utils import get_default_user_token
# Create your views here.


def api_check(request):
    return JsonResponse({"status": True})


def get_api_token(request):
    return JsonResponse({"token": get_default_user_token()})
