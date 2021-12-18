from rest_framework import serializers
from user.models import User, UserDetails


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = '__all__'


class UserDetailsSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        try:
            instance = UserDetails.objects.create(**validated_data)
            return instance
        except Exception as e:
            raise e

    class Meta:
        model = UserDetails
        fields = '__all__'
