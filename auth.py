from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model, authenticate
from oauth2_provider.oauth2_validators import OAuth2Validator

User = get_user_model()


class AuthBackend(ModelBackend):

    def authenticate_user(self, user):
        if user.check_password(self.password) and self.user_can_authenticate(user):
            return user
        return None

    def user_can_authenticate(self, user):
        is_active = getattr(user, 'is_active', None)
        return is_active or is_active is None

    def get(self, key, source=None):
        data = source if source else self.request.data
        return data[str(key)] if key in data else None

    def authenticate(self, username=None, password=None, **kwargs):

        self.username = username
        self.password = password
        is_user = User.objects.filter(username=username).first()
        user = None
        if is_user:
            user = self.authenticate_user(is_user)
        return user


class OTPOAuth2Validator(OAuth2Validator):

    def validate_user(self, username, password, client, request, *args, **kwargs):
        """
        Check username and password along with otp expire time correspond to a valid and active User
        """
        u = authenticate(username=username, password=password)
        if u is not None and u.is_active:
            return True
        return False
