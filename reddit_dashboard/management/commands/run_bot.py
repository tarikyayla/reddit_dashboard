from django.core.management import BaseCommand
from discord_bot.bot import client
from reddit_dashboard.settings import DISCORD_BOT_TOKEN


class Command(BaseCommand):
    help = "To run discord bot"

    def handle(self, *args, **options):
        client.run(DISCORD_BOT_TOKEN)
