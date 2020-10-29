from rest_framework.views import APIView
from api.responses import SUCCESS_RESPONSE, FAIL_RESPONSE
from api.reddit.manager import reddit_manager
from reddit_dashboard.models import DashboardUser
from reddit_dashboard import logger
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class RedditAuth(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.reddit_user_id:
            return Response({
                "active": True,
                "user_id": user.reddit_user_id,
                "user_data": user.reddit_user_data,
                "username": user.reddit_username
            })

        redirect_url = reddit_manager.get_auth_link(request.user.username)

        return Response({
            "active": False,
            "redirect_link": redirect_url
        })


class GetSubreddits(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            subreddits = reddit_manager.get_user_subreddits(user=request.user)
            DashboardUser.add_subreddits_to_user(subreddits)
            return SUCCESS_RESPONSE
        except Exception as ex:
            logger.error(str(ex))
            return FAIL_RESPONSE(ex)



















