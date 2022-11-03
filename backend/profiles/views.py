from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authorization.authentication import JWTAuthentication
from authorization.models import User
from authorization.serializers import UserSerializer



class ProfileAPIView(APIView):
    """API endpoint for editing a user's profile"""
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        data = request.data
        serializer = UserSerializer(user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChangePasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        user = request.user
        if not user:
            return Response(
                {"error": "You are not logged in"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = request.data

        if not user.check_password(data["old_password"]):
            return Response(
                {"error": "Old password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if data["new_password"] != data["confirm_password"]:
            return Response(
                {"error": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user.check_password(data["new_password"]):
            return Response(
                {"error": "New password cannot be the same as old password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(data["new_password"])
        user.save()

        return Response(
            {"success": True, "message": "Password changed successfully"},
            status=status.HTTP_200_OK,
        )