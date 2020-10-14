from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from api.exceptions.validation_exception import ValidationException
from django.contrib.auth import login, authenticate, checks
from django.contrib.auth.models import User


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, min_length=6)

    def validate(self, attrs):
        super(LoginSerializer, self).validate(self, attrs)

        if self.is_valid():
            user = authenticate(username=self.username, password=self.password)
            if not user:
                raise ValidationError("Username or password incorrect")

    def login(self, request):
        user = authenticate(username=self.username, password=self.password)
        if user:
            login(request, user)


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True,)
    password = serializers.CharField(required=True)
    passwordRe = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        super().validate(self, attrs)
        if self.password != self.passwordRe:
            raise ValidationError("Passwords do not match")

        validation_list = ["username", "email", "discord_server"]

        for validation in validation_list:
            self.send_validation_error(validation)

    def create(self, validated_data):
        user = User(username=validated_data["username"],
                    password=validated_data["password"],
                    email=validated_data["email"])

        user.save()



    def send_validation_error(self, attr):
        filter_dict = {}
        value = getattr(self, attr)
        filter_dict[attr] = value
        user = User.objects.filter(**filter_dict)
        if user:
            raise ValidationException(attr, reason=f"{attr} already exist")

