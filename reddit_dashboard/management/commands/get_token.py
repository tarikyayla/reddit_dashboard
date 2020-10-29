from django.core.management import BaseCommand
from reddit_dashboard.utils.user_utils import get_default_user_token


class Command(BaseCommand):
    help = "Get authentication token for api and create user if not exist "

    def handle(self, *args, **options):        
        token = get_default_user_token()
        print(token)
