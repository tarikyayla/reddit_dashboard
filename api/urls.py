from django.urls import path
from api.views.public import api_check


urlpatterns = [
    path("hello/", api_check),
]
