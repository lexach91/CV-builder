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
        password = validated_data.pop("password", None)
        birthday = validated_data["birthday"]
        print(birthday)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


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
