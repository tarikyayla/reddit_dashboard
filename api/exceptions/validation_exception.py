from rest_framework.exceptions import APIException


class ValidationException(APIException):
    status_code = 500
    validation_key = ""
    reason = ""

    def __init__(self, key, reason, status_code=500):
        self.status_code = status_code
        self.detail = {"success": False, "reason": reason, "key": key}



