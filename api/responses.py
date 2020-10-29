from rest_framework import status
from rest_framework.response import Response
from django.conf import settings

SUCCESS_RESPONSE = Response({
    "success": True
}, status=status.HTTP_200_OK)


def FAIL_RESPONSE(detail=None):
    resp = {
        "success": False,
    }

    if settings.DEBUG and detail:
        resp["detail"] = str(detail)

    return Response(resp, status=status.HTTP_400_BAD_REQUEST)
