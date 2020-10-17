from django.urls import path
from api.views.public import api_check
from api.views.user import Login, Register


urlpatterns = [
    path("hello/", api_check),
    path("login/", Login.as_view()),
    path("register/", Register.as_view())
]
