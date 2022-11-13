from django.urls import path
from .views import (
    MyCVsAPIView,
    CVDetailsAPIView,
    HeaderAPIView,
    SummaryAPIView,
    ExperienceSectionAPIView,
    EducationSectionAPIView,
    ShowcaseSectionAPIView,
    SoftSkillSectionAPIView,
    ProfessionalSkillSectionAPIView,
    SocialLinkSectionAPIView,
    LanguageSectionAPIView,
    VolunteerSectionAPIView,
    InterestSectionAPIView,
)


urlpatterns = [
    path("", MyCVsAPIView.as_view()),
    path("<int:pk>/", CVDetailsAPIView.as_view()),
    path("<int:pk>/header/", HeaderAPIView.as_view()),
    path("<int:pk>/summary/", SummaryAPIView.as_view()),
    path("<int:pk>/experience/", ExperienceSectionAPIView.as_view()),
    path("<int:pk>/education/", EducationSectionAPIView.as_view()),
    path("<int:pk>/showcase/", ShowcaseSectionAPIView.as_view()),
    path("<int:pk>/softskill/", SoftSkillSectionAPIView.as_view()),
    path(
        "<int:pk>/professionalskill/",
        ProfessionalSkillSectionAPIView.as_view(),
    ),
    path("<int:pk>/sociallink/", SocialLinkSectionAPIView.as_view()),
    path("<int:pk>/language/", LanguageSectionAPIView.as_view()),
    path("<int:pk>/volunteer/", VolunteerSectionAPIView.as_view()),
    path("<int:pk>/interest/", InterestSectionAPIView.as_view()),
]
