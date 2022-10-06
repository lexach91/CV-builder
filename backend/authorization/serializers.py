from rest_framework.serializers import ModelSerializer
from .models import User


class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",  # optional
            "last_name",  # optional
            "birthday",  # optional
            "country",  # optional
        )
        extra_kwargs = {
           "password": {"write_only": True},
           "first_name": {"required": False},
           "last_name": {"required": False},
           "birthday": {"required": False},
           "country": {"required": False},
        }
        
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "birthday",
            "country",
        )
        read_only_fields = ("id", "email")
