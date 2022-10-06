from django.urls import path
from .views import (
    RegisterAPIView,
    LoginAPIView,
    VerifyTokenAPIView,
    GetUserAPIView,
    RefreshTokenAPIView,
    LogoutAPIView,
)


urlpatterns = [
    path("register", RegisterAPIView.as_view()),
    path("login", LoginAPIView.as_view()),
    path("verify", VerifyTokenAPIView.as_view()),
    path("user", GetUserAPIView.as_view()),
    path("refresh", RefreshTokenAPIView.as_view()),
    path("logout", LogoutAPIView.as_view()),
]
