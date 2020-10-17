from django.shortcuts import render
from django.http.response import JsonResponse
from django.contrib.auth.decorators import login_required
# Create your views here.


def api_check(request):
    return JsonResponse(
        {
            "status": True
        }
    )