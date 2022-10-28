from django.urls import path
from .views import (
    MyCVsAPIView,
    CVDetailsAPIView
)


urlpatterns = [
    path("", MyCVsAPIView.as_view()),
    path("<int:pk>/", CVDetailsAPIView.as_view()),    
]