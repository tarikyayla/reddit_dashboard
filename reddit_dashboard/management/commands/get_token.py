from django.core.management import BaseCommand
from reddit_dashboard.utils.user_utils import get_default_user_token
from reddit_dashboard.tasks import get_hot_posts
from discord_bot.bot import client
from discord import TextChannel
from reddit_dashboard.settings import DISCORD_BOT_TOKEN
class Command(BaseCommand):
    help = "Get authentication token for api and create user if not exist "

    def handle(self, *args, **options):        
        #token = get_default_user_token()
        #print(token)
        servers = client.servers
        print(servers)
        for channel in servers.channels:
            print(isinstance(TextChannel, channel), channel.id, channel.name)


