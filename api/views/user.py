from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from api.serializers.user_serializers import LoginSerializer, RegisterSerializer
from api.responses import SUCCESS_RESPONSE, FAIL_RESPONSE
from django.contrib.auth import login, authenticate
from api.exceptions.validation_exception import ValidationException
from api.permissions import OnlyAnon


class Login(APIView):
    permission_classes = [OnlyAnon]

    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request,  format=None):
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

    def post(self, request):
        if request.user.is_authenticated:
            return FAIL_RESPONSE
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(serializer.validated_data)
            return SUCCESS_RESPONSE
        return FAIL_RESPONSE






