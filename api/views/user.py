from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework import status
from rest_framework.views import APIView
from api.serializers.user_serializers import LoginSerializer, RegisterSerializer
from api.responses import SUCCESS_RESPONSE

class login(APIView):
    def get(self, request, format=None):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            serializer.login(request)
            return SUCCESS_RESPONSE

class register(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create()
            return SUCCESS_RESPONSE




