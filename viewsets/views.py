from rest_framework import viewsets
from user.models import User, UserDetails
from serializers.serializers import UserSerializer, UserDetailsSerializer
import pandas
from rest_framework.response import Response
from rest_framework.decorators import action
from core import messages
from core.permissions import IsAdminOrSelf,IsAnonymous
from oauth2_provider.contrib.rest_framework import OAuth2Authentication


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (OAuth2Authentication,)
    permission_classes = (IsAdminOrSelf,)

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

    @action(detail=False, methods=['POST'])
    def create_user(self, validated_data):
        try:
            username = validated_data.data.get("username")
            password = validated_data.data.get("password")
            user_instance = User.objects.create_user(username=username, password=password, is_active=True)
            user_instance.set_password(password)
            user_instance.save()
            return Response(messages.USER_CREATED_MSG, status=201)
        except Exception as e:
            raise e


class UserDetailsViewSet(viewsets.ModelViewSet):
    serializer_class = UserDetailsSerializer
    permission_class = (IsAnonymous,)

    def get_queryset(self):
        queryset = UserDetails.objects.all()
        return queryset

    @action(detail=False, methods=['POST'])
    def read_json_file(self, request, pk=None):
        json_file = parse_json_file(request.data.get('file'))
        try:
            for i in json_file:
                serializer = self.get_serializer(data=i)
                serializer.is_valid()
                serializer.save()
            return Response(messages.FILE_UPLOADED_MSG, status=201)
        except Exception as e:
            raise e


def parse_json_file(file):
    file.seek(0)
    ext = file.name.rsplit('.', 1)[-1]
    data = pandas.read_json(file) if ext == 'json' else pandas.read_excel(file)
    return data.to_dict('records')


class Login(viewsets.ModelViewSet):
    serializer_class = UserDetailsSerializer

    @action(detail=False, methods=['POST'])
    def get_user_details(self, request):
        username = request.data.get("username")
        user_id = User.objects.values_list('id', flat=True).get(
                        username=username)
        if user_id:
            return Response(dict(user_id=user_id), 200)
        else:
            return Response(messages.ERROR_MSG, 400)
