import datetime
import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer
from .models import User, BlacklistedToken, PasswordResetToken
from .authentication import (
    JWTAuthentication,
    create_access_token,
    create_refresh_token,
    decode_access_token,
    decode_refresh_token,
)
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class RegisterAPIView(APIView):
    """API endpoint for registering a new user"""
    def post(self, request):
        data = request.data
        
        if data["password"] != data["password_confirm"]:
            return Response(
                {"error": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        serializer = CreateUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(status=status.HTTP_201_CREATED)
    

class LoginAPIView(APIView):
    """API endpoint for logging in a user"""
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response(
                {"error": "Please provide both email and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        if not user.check_password(password):
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        if request.COOKIES.get("refresh_token") or request.COOKIES.get("access_token"):
            return Response(
                {"error": "You are already logged in"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        response = Response()
        
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            expires=datetime.datetime.utcnow() + datetime.timedelta(seconds=600),
        )
        
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            expires=datetime.datetime.utcnow() + datetime.timedelta(days=3),
        )
        
        response.status_code = status.HTTP_200_OK
        
        return response
        