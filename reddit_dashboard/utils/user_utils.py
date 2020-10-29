from rest_framework.authtoken.models import Token 
from reddit_dashboard.models import DashboardUser
from django.conf import settings


def get_default_user_token():
    user = DashboardUser.objects.filter(username=settings.USERNAME).first()
    token = None
    if not user:
        user = DashboardUser.objects.create_user(username=settings.USERNAME, password=settings.PASSWORD)
    token = Token.objects.get_or_create(user=user)
    
    return "Token " + str(token[0])