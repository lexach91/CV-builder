from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (
    Theme,
    CV,
    Header,
    Summary,
    ExperienceSection,
    Experience,
    ExperienceBullet,
    EducationSection,
    Education,
    EducationBullet,
    ShowcaseSection,
    Showcase,
    ShowcaseBullet,
    SoftSkillSection,
    SoftSkill,
    ProfessionalSkillSection,
    ProfessionalSkill,
    SocialLinkSection,
    SocialLink,
    LanguageSection,
    Language,
    VolunteerSection,
    Volunteer,
    VolunteerBullet,
    InterestSection,
    Interest,
    )
from .serializers import (
    CVSerializer,
    HeaderSerializer,
    SummarySerializer,
    ExperienceBulletSerializer,
    ExperienceSerializer,
    ExperienceSectionSerializer,
    EducationBulletSerializer,
    EducationSerializer,
    EducationSectionSerializer,
    ShowcaseBulletSerializer,
    ShowcaseSerializer,
    ShowcaseSectionSerializer,
    SoftSkillSerializer,
    SoftSkillSectionSerializer,
    ProfessionalSkillSerializer,
    ProfessionalSkillSectionSerializer,
    SocialLinkSerializer,
    SocialLinkSectionSerializer,
    LanguageSerializer,
    LanguageSectionSerializer,
    VolunteerBulletSerializer,
    VolunteerSerializer,
    VolunteerSectionSerializer,
    InterestSerializer,
    InterestSectionSerializer,
    )
from authorization.authentication import JWTAuthentication



class MyCVsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        user = request.user
        cvs = CV.objects.filter(user=user)
        if not cvs:
            return Response(
                {"error": "No CVs found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CVSerializer(cvs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def post(self, request):
        user = request.user
        cv = CV.objects.create(user=user)
        serializer = CVSerializer(cv)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class CVDetailsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CVSerializer(cv)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = CVSerializer(cv, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        cv.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    