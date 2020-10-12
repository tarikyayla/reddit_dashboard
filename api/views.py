from django.shortcuts import render
from django.http.response import JsonResponse
# Create your views here.


def hello(request):
    return JsonResponse(
        {
            "Status": True
        }
    )

