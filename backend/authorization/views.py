import datetime
import random
import string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer, UserSerializer
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
        print(data)
        if not data:
            return Response(
                {"error": "No data provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        if not data.get("email"):
            return Response(
                {"email": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        if not data.get("password"):
            return Response(
                {"password": "Password is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        if not data.get("password_confirm"):
            return Response(
                {"password_confirm": "Password confirmation is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )        
        
        if data["password"] != data["password_confirm"]:
            return Response(
                {"password_confirm": "Passwords do not match"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if data.get("email") is not None:
            if User.objects.filter(email=data["email"]).exists():
                return Response(
                    {"email": "User with this email already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        serializer = CreateUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class LoginAPIView(APIView):
    """API endpoint for logging in a user"""
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        print(email, password)
        
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
        
        return Response(data={
            "access": access_token,
            "refresh": refresh_token,
        },
        status=status.HTTP_200_OK,)
    

class VerifyTokenAPIView(APIView):
    """API endpoint for verifying a token"""
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request):
        return Response(status=status.HTTP_200_OK)
    

class GetUserAPIView(APIView):
    """API endpoint for getting a user"""
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request):
        user = request.user
        
        if user is None:
            return Response(
                {"error": "You are not logged in"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RefreshTokenAPIView(APIView):
    """API endpoint for refreshing a token"""
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")
        print(refresh_token)
        print(request.COOKIES)
        print(request.data)
        print(request.headers)
        
        if not refresh_token:
            print("no refresh token")
            return Response(
                {"error": "You are not logged in"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        if BlacklistedToken.objects.filter(token=refresh_token).exists():
            print("refresh token is blacklisted")
            return Response(
                {"error": "You are not logged in or your session has expired"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        id = decode_refresh_token(refresh_token)
        
        if id is None:
            print("refresh token is invalid")
            return Response(
                {"error": "Invalid token"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        user = User.objects.filter(id=id).first()
        
        if user is None:
            print("user does not exist")
            return Response(
                {"error": "User not found"},
                status=status.HTTP_400_BAD_REQUEST,
            )
            
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        
        return Response(data={
            "access": access_token,
            "refresh": refresh_token,
        },
        status=status.HTTP_200_OK,)
    
    
class LogoutAPIView(APIView):
    """API endpoint for logging out a user"""
    def post(self, request):
        access_token = request.COOKIES.get("access_token")
        refresh_token = request.COOKIES.get("refresh_token")
        
        response = Response()
        
        if access_token:
            response.delete_cookie("access_token")
            
        if refresh_token:
            BlacklistedToken.objects.create(token=refresh_token)
            response.delete_cookie("refresh_token")
            
        response.status_code = status.HTTP_200_OK
        
        return response

