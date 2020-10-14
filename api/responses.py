from rest_framework import status
from rest_framework.response import Response

SUCCESS_RESPONSE = Response({
    "success": True
}, status=status.HTTP_200_OK)
