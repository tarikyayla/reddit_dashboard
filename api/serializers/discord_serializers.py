from rest_framework import serializers
from reddit_dashboard.models import DiscordServer, TextChannel
from api.serializers.reddit_serializers import SubredditSerializer


class TextChannelSerializer(serializers.ModelSerializer):

    following_subreddits = SubredditSerializer(many=True)

    class Meta:
        model = TextChannel
        fields = '__all__'


class TextChannelFollowSerializer(serializers.Serializer):
    subreddit_id = serializers.IntegerField(required=True)
    method = serializers.IntegerField(default=1, required=False)


class TextChannelCreateSerializer(serializers.Serializer):
    discord_id = serializers.IntegerField(required=True)
    name = serializers.CharField(required=True)
    channel_id = serializers.CharField(required=True)


class DiscordSerializer(serializers.ModelSerializer):
    text_channels = serializers.SerializerMethodField()

    def get_text_channels(self, obj):
        return TextChannelSerializer(TextChannel.objects.filter(server_id=obj.id), many=True).data

    class Meta:
        model = DiscordServer
        fields = ('id', 'name', 'text_channels',)

