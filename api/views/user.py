from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from api.serializers.user_serializers import LoginSerializer, RegisterSerializer
from api.responses import SUCCESS_RESPONSE, FAIL_RESPONSE
from django.contrib.auth import authenticate
from api.exceptions.validation_exception import ValidationException
from api.permissions import OnlyAnon
from api.authentications import CsrfExemptSessionAuthentication
from django.contrib.auth.decorators import login_required
from api.reddit.manager import reddit_manager
from reddit_dashboard.models import DashboardUser
from reddit_dashboard import logger

class Login(APIView):
    permission_classes = [OnlyAnon]
    authentication_classes = [CsrfExemptSessionAuthentication]

    def post(self, request):
        if request.user.is_authenticated:
            return FAIL_RESPONSE
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(request, username=serializer.validated_data["username"], password=serializer.validated_data["password"])
            if not user:
                raise ValidationException("username", "Username or password dont match")
            serializer.login(request, user)
            return SUCCESS_RESPONSE
        return FAIL_RESPONSE


class Register(APIView):
    permission_classes = [OnlyAnon]
    authentication_classes = [CsrfExemptSessionAuthentication]

    def post(self, request):
        if request.user.is_authenticated:
            return FAIL_RESPONSE
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return SUCCESS_RESPONSE
        return FAIL_RESPONSE


@login_required
@api_view(["GET"])
def get_subreddits(request):
    try:
        subreddits = reddit_manager.get_user_subreddits(user=request.user)
        DashboardUser.add_subreddits_to_user(subreddits)
        return SUCCESS_RESPONSE
    except Exception as ex:
        logger.error(str(ex))
        return FAIL_RESPONSE














