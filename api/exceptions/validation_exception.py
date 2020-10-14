from rest_framework.exceptions import APIException


class ValidationException(APIException):
    status_code = 500
    validation_key = ""
    reason = ""

    def __init__(self, key, reason, status_code=500):
        self.reason = reason
        self.validation_key = key
        self.status_code = status_code



