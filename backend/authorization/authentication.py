import jwt
import datetime
from rest_framework import status, exceptions
from rest_framework.response import Response
from rest_framework.authentication import BaseAuthentication, get_authorization_header

from .models import User


class JWTAuthentication(BaseAuthentication):
    """JWT Authentication class"""
    
    def authenticate(self, request):
        """Authenticate the user"""
        
        access_token = get_authorization_header(request).split()
        
        if not access_token:
            raise exceptions.AuthenticationFailed('No token provided')
        
        id = decode_access_token(access_token[1])
        
        if id is None:
            raise exceptions.AuthenticationFailed('Invalid token')
        
        user = User.objects.filter(id=id).first()
        
        if user is None:
            raise exceptions.AuthenticationFailed('User not found')
        
        return (user, None)
    
    
def create_access_token(user_id):
    """
    Creates an access token for a user.
    """
    return jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() +
            datetime.timedelta(seconds=600),
            "iat": datetime.datetime.utcnow(),
        },
        "access_secret",
        algorithm="HS256",
    )

def create_refresh_token(user_id):
    """
    Creates a refresh token for a user.
    """
    return jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() +
            datetime.timedelta(days=3),
            "iat": datetime.datetime.utcnow(),
        },
        "refresh_secret",
        algorithm="HS256",
    )
    
def decode_access_token(access_token):
    """
    Decodes an access token.
    """
    try:
        return jwt.decode(access_token, "access_secret", algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed("Access token expired")
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed("Invalid access token")
    
def decode_refresh_token(refresh_token):
    """
    Decodes a refresh token.
    """
    try:
        return jwt.decode(refresh_token, "refresh_secret", algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed("Refresh token expired")
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed("Invalid refresh token")
