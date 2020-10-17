from rest_framework import status
from rest_framework.response import Response

SUCCESS_RESPONSE = Response({
    "success": True
}, status=status.HTTP_200_OK)

FAIL_RESPONSE = Response({
    "success": False
}, status=status.HTTP_400_BAD_REQUEST)
