from django.urls import path
from api.views.public import api_check
from api.views.user import login, register


urlpatterns = [
    path("hello/", api_check),
    path("login/", login),
    path("register", register)
]
