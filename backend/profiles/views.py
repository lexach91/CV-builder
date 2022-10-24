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
