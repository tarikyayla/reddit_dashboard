import discord
from reddit_dashboard.settings import DISCORD_BOT_TOKEN

class DiscordClient(discord.Client):
    async def on_ready(self):
        print(f'Logged on as {self.user}')


discord_client = DiscordClient()