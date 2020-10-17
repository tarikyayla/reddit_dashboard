from rest_framework import permissions


class OnlyAnon(permissions.BasePermission):
    message = "Already logged in!"

    def has_permission(self, request, view):
        return not request.user.is_authenticated