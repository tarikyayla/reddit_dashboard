from rest_framework import serializers
from api.exceptions.validation_exception import ValidationException
from django.contrib.auth import login, authenticate, checks
from reddit_dashboard.models import DashboardUser


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, min_length=6)

    def login(self, request, user):
        if user:
            login(request, user)


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    passwordRe = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    def validate_password(self, value):
        if value != self.initial_data["passwordRe"]:
            raise ValidationException("password", "Passwords dont match")
        return value

    def validate(self, attrs):
        super(RegisterSerializer, self).validate(attrs)

        validation_list = ["username", "email"]

        for validation in validation_list:
            self.send_validation_error(validation)

        return attrs

    def create(self, validated_data):
        user = DashboardUser.objects.create_user(username=validated_data["username"],
                                                 password=validated_data["password"],
                                                 email=validated_data["email"])

        user.save()

    def send_validation_error(self, attr):
        filter_dict = {}
        value = self.initial_data.get(attr)
        filter_dict[attr] = value
        user = DashboardUser.objects.filter(**filter_dict)
        if user:
            raise ValidationException(attr, reason=f"{attr} already exist")

