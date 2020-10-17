from django.shortcuts import render


def dashboard(requests):
    return render(requests, "index.html")
