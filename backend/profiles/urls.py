from django.urls import path
from .views import ProfileAPIView

urlpatterns = [
    path("", ProfileAPIView.as_view()),
]
