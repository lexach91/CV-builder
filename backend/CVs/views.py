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


class HeaderAPIView(APIView):
    """Create and edit header section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if Header.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Header already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        
        serializer = HeaderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            header = Header.objects.get(cv=cv)
        except Header.DoesNotExist:
            return Response(
                {"error": "Header not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = HeaderSerializer(header, data=request.data)
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
        try:
            header = Header.objects.get(cv=cv)
        except Header.DoesNotExist:
            return Response(
                {"error": "Header not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        header.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SummaryAPIView(APIView):
    """Create and edit summary section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if Summary.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Summary already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = SummarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            summary = Summary.objects.get(cv=cv)
        except Summary.DoesNotExist:
            return Response(
                {"error": "Summary not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = SummarySerializer(summary, data=request.data)
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
        try:
            summary = Summary.objects.get(cv=cv)
        except Summary.DoesNotExist:
            return Response(
                {"error": "Summary not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        summary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExperienceSectionAPIView(APIView):
    """Create and edit experience section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if ExperienceSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Experience section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        print(request.data)
        serializer = ExperienceSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            experience_section = ExperienceSection.objects.get(cv=cv)
        except ExperienceSection.DoesNotExist:
            return Response(
                {"error": "Experience section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        experiences = request.data.pop("experiences")
        errors = []
        for experience in experiences:
            serializer = ExperienceSerializer(data=experience, partial=True)
            if serializer.is_valid():
                serializer.save(experience_section=experience_section)
            else:
                errors.append(serializer.errors)
        
        serializer = ExperienceSectionSerializer(experience_section)
        return Response(serializer.data, status=status.HTTP_200_OK)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            experience_section = ExperienceSection.objects.get(cv=cv)
        except ExperienceSection.DoesNotExist:
            return Response(
                {"error": "Experience section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        experience_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EducationSectionAPIView(APIView):
    """Create and edit education section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if EducationSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Education section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = EducationSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            education_section = EducationSection.objects.get(cv=cv)
        except EducationSection.DoesNotExist:
            return Response(
                {"error": "Education section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = EducationSectionSerializer(
            education_section, data=request.data
        )
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
        try:
            education_section = EducationSection.objects.get(cv=cv)
        except EducationSection.DoesNotExist:
            return Response(
                {"error": "Education section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        education_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ShowcaseSectionAPIView(APIView):
    """Create and edit showcase section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if ShowcaseSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Showcase section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = ShowcaseSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            showcase_section = ShowcaseSection.objects.get(cv=cv)
        except ShowcaseSection.DoesNotExist:
            return Response(
                {"error": "Showcase section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ShowcaseSectionSerializer(
            showcase_section, data=request.data
        )
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
        try:
            showcase_section = ShowcaseSection.objects.get(cv=cv)
        except ShowcaseSection.DoesNotExist:
            return Response(
                {"error": "Showcase section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        showcase_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SoftSkillSectionAPIView(APIView):
    """Create and edit soft skill section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if SoftSkillSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Soft skill section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = SoftSkillSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            soft_skill_section = SoftSkillSection.objects.get(cv=cv)
        except SoftSkillSection.DoesNotExist:
            return Response(
                {"error": "Soft skill section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = SoftSkillSectionSerializer(
            soft_skill_section, data=request.data
        )
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
        try:
            soft_skill_section = SoftSkillSection.objects.get(cv=cv)
        except SoftSkillSection.DoesNotExist:
            return Response(
                {"error": "Soft skill section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        soft_skill_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfessionalSkillSectionAPIView(APIView):
    """Create and edit professional skill section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if ProfessionalSkillSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Professional skill section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = ProfessionalSkillSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            professional_skill_section = ProfessionalSkillSection.objects.get(
                cv=cv
            )
        except ProfessionalSkillSection.DoesNotExist:
            return Response(
                {"error": "Professional skill section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ProfessionalSkillSectionSerializer(
            professional_skill_section, data=request.data
        )
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
        try:
            professional_skill_section = ProfessionalSkillSection.objects.get(
                cv=cv
            )
        except ProfessionalSkillSection.DoesNotExist:
            return Response(
                {"error": "Professional skill section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        professional_skill_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SocialLinkSectionAPIView(APIView):
    """Create and edit social link section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if SocialLinkSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Social link section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = SocialLinkSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            social_link_section = SocialLinkSection.objects.get(cv=cv)
        except SocialLinkSection.DoesNotExist:
            return Response(
                {"error": "Social link section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = SocialLinkSectionSerializer(
            social_link_section, data=request.data
        )
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
        try:
            social_link_section = SocialLinkSection.objects.get(cv=cv)
        except SocialLinkSection.DoesNotExist:
            return Response(
                {"error": "Social link section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        social_link_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LanguageSectionAPIView(APIView):
    """Create and edit language section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if LanguageSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Language section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = LanguageSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            language_section = LanguageSection.objects.get(cv=cv)
        except LanguageSection.DoesNotExist:
            return Response(
                {"error": "Language section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = LanguageSectionSerializer(
            language_section, data=request.data
        )
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
        try:
            language_section = LanguageSection.objects.get(cv=cv)
        except LanguageSection.DoesNotExist:
            return Response(
                {"error": "Language section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        language_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VolunteerSectionAPIView(APIView):
    """Create and edit volunteer section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if VolunteerSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Volunteer section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = VolunteerSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            volunteer_section = VolunteerSection.objects.get(cv=cv)
        except VolunteerSection.DoesNotExist:
            return Response(
                {"error": "Volunteer section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = VolunteerSectionSerializer(
            volunteer_section, data=request.data
        )
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
        try:
            volunteer_section = VolunteerSection.objects.get(cv=cv)
        except VolunteerSection.DoesNotExist:
            return Response(
                {"error": "Volunteer section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        volunteer_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class InterestSectionAPIView(APIView):
    """Create and edit interest section of CV"""

    authentication_classes = [JWTAuthentication]

    def post(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if InterestSection.objects.filter(cv=cv).exists():
            return Response(
                {"error": "Interest section already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = InterestSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cv=cv)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        user = request.user
        try:
            cv = CV.objects.get(pk=pk, user=user)
        except CV.DoesNotExist:
            return Response(
                {"error": "CV not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        try:
            interest_section = InterestSection.objects.get(cv=cv)
        except InterestSection.DoesNotExist:
            return Response(
                {"error": "Interest section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = InterestSectionSerializer(
            interest_section, data=request.data
        )
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
        try:
            interest_section = InterestSection.objects.get(cv=cv)
        except InterestSection.DoesNotExist:
            return Response(
                {"error": "Interest section not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        interest_section.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
