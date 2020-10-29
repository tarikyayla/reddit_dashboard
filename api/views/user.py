from rest_framework.views import APIView
from api.responses import SUCCESS_RESPONSE, FAIL_RESPONSE
from api.reddit.manager import reddit_manager
from reddit_dashboard.models import DashboardUser
from reddit_dashboard import logger
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


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

















