from django.urls import path
from .views import ProfileAPIView, ChangePasswordAPIView

urlpatterns = [
    path("", ProfileAPIView.as_view()),
    path("change-password/", ChangePasswordAPIView.as_view()),
]
