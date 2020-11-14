from reddit_dashboard.models import DiscordServer, Subreddit, TextChannel, DashboardUser
from api.serializers.discord_serializers import TextChannelSerializer, TextChannelCreateSerializer, \
    TextChannelFollowSerializer
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from reddit_dashboard import settings
from api.serializers.discord_serializers import DiscordSerializer
from rest_framework.response import Response
from api.responses import FAIL_RESPONSE, SUCCESS_RESPONSE


class DiscordChannels(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            user = DashboardUser.objects.get(username=settings.USERNAME)

        discord_channels = DiscordSerializer(DiscordServer.objects.filter(added_by=user), many=True).data
        add_discord_url = f"https://discord.com/api/oauth2/authorize?client_id={settings.DISCORD_CLIENT_ID}" \
            f"&permissions=0&redirect_uri={settings.DISCORD_REDIRECT_URL}&response_type=code" \
            f"&scope=bot%20identify"

        return Response({
            "discord_channels": discord_channels,
            "add_url": add_discord_url
        })


class TextChannels(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, pk=None):
        discord_id = request.GET.get("discord_id")
        channels = TextChannel.objects.filter(server_id=discord_id)
        return Response(TextChannelSerializer(instance=channels, many=True).data)

    def retrieve(self, request, pk=None):
        return Response(TextChannelSerializer(TextChannel.objects.get(pk=pk)).data)

    def create(self, request):
        serializer = TextChannelCreateSerializer(data=request.data)

        if serializer.is_valid():
            serializer = serializer.data
            dc_server = DiscordServer.objects.get(pk=serializer["discord_id"])
            text_channel = TextChannel(
                slug=serializer["name"],
                channel_id=serializer["channel_id"],
                server=dc_server
            )

            text_channel.save()

            return SUCCESS_RESPONSE
        return FAIL_RESPONSE()

    def update(self, request, pk=None):

        channel = TextChannel.objects.get(pk=pk)
        serializer = TextChannelFollowSerializer(data=request.data)
        if serializer.is_valid():
            subreddit = Subreddit.objects.get(pk=serializer.data["subreddit_id"])
            channel.following_subreddits.add(subreddit)
            channel.save()
            return SUCCESS_RESPONSE

        return FAIL_RESPONSE()

    def destroy(self, request, pk=None):
        text_channel = TextChannel.objects.get(pk=pk)
        text_channel.delete()
        return SUCCESS_RESPONSE











