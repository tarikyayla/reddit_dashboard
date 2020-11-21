from reddit_dashboard.models import DashboardUser, TextChannel, DiscordServer, REDIS_CONNECTION, RedisConsts
import json

class RedisModelSerializer:
    def __init__(self, server_id=None, server_name=None):
        self.payload = {
            "server_id": server_id,
            "server_name": server_name,
            "channels": []
        }

    def add_channel(self, channel_name, channel_id):
        self.payload["channels"].append(
            {
                "channel_id": channel_id,
                "slug": channel_name
            }
        )

    def push(self):
        REDIS_CONNECTION.lpush(RedisConsts.SERVER_PUSH, json.dumps(self.payload))

    @classmethod
    def serialize(cls, payload):
        payload_data = json.loads(payload)
        server = DiscordServer.objects.filter(server_id=payload_data["server_id"]).first()
        if not server:
            server = DiscordServer()

        server.name = payload_data["server_name"]
        server.server_id = payload_data["server_id"]
        server.added_by = DashboardUser.get_default_user()

        server.save()

        for channel in payload_data["channels"]:
            text_channel = TextChannel(**channel)
            text_channel.server = server
            text_channel.save()
