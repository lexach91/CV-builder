from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
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


class HeaderSerializer(ModelSerializer):
    class Meta:
        model = Header
        fields = (
            'job_title',
            'email',
            'phone',
            'address',
            'url_link'
        )
    def to_representation(self, instance):
        return {
            'job_title': instance.get().job_title if instance.exists() else None,
            'email': instance.get().email if instance.exists() else None,
            'phone': instance.get().phone if instance.exists() else None,
            'address': instance.get().address if instance.exists() else None,
            'url_link': instance.get().url_link if instance.exists() else None,
        }


class SummarySerializer(ModelSerializer):
    class Meta:
        model = Summary
        fields = ('summary',)
    def to_representation(self, instance):
        return instance.get().summary if instance.exists() else None


class ExperienceBulletSerializer(ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = ('bullet',)
    # def to_representation(self, instance):
    #     return instance.bullet


class ExperienceSerializer(ModelSerializer):
    bullets = ExperienceBulletSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = (
            'company',
            'position',
            'start_date',
            'end_date',
            'description',
            'bullets',
        )
    def to_representation(self, instance):
        return {
            'company': instance.company,
            'position': instance.position,
            'start_date': instance.start_date,
            'end_date': instance.end_date,
            'description': instance.description,
            'bullets': [ExperienceBulletSerializer(bullet).data for bullet in instance.experience_bullets.all()],
        }


class ExperienceSectionSerializer(ModelSerializer):
    experiences = ExperienceSerializer(many=True, read_only=True)

    class Meta:
        model = ExperienceSection
        fields = ('experiences',)
    def to_representation(self, instance):
        return [ExperienceSerializer(experience).data for experience in instance.get().experiences.all()]


class EducationBulletSerializer(ModelSerializer):
    class Meta:
        model = EducationBullet
        fields = ('bullet',)
    


class EducationSerializer(ModelSerializer):
    bullets = EducationBulletSerializer(many=True, read_only=True)

    class Meta:
        model = Education
        fields = (
            'school',
            'specialization',
            'scores',
            'start_date',
            'end_date',
            'bullets',
        )
    def to_representation(self, instance):
        return {
            'school': instance.school,
            'specialization': instance.specialization,
            'scores': instance.scores,
            'start_date': instance.start_date,
            'end_date': instance.end_date,
            'bullets': [EducationBulletSerializer(bullet).data for bullet in instance.education_bullets.all()],
        }


class EducationSectionSerializer(ModelSerializer):
    educations = EducationSerializer(many=True, read_only=True)

    class Meta:
        model = EducationSection
        fields = ('educations',)
    def to_representation(self, instance):
        return [EducationSerializer(education).data for education in instance.get().educations.all()]


class ShowcaseBulletSerializer(ModelSerializer):
    class Meta:
        model = ShowcaseBullet
        fields = '__all__'


class ShowcaseSerializer(ModelSerializer):
    bullets = ShowcaseBulletSerializer(many=True, read_only=True)

    class Meta:
        model = Showcase
        fields = '__all__'


class ShowcaseSectionSerializer(ModelSerializer):
    showcases = ShowcaseSerializer(many=True, read_only=True)

    class Meta:
        model = ShowcaseSection
        fields = '__all__'


class SoftSkillSerializer(ModelSerializer):
    class Meta:
        model = SoftSkill
        fields = '__all__'


class SoftSkillSectionSerializer(ModelSerializer):
    skills = SoftSkillSerializer(many=True, read_only=True)

    class Meta:
        model = SoftSkillSection
        fields = '__all__'


class ProfessionalSkillSerializer(ModelSerializer):
    class Meta:
        model = ProfessionalSkill
        fields = '__all__'


class ProfessionalSkillSectionSerializer(ModelSerializer):
    skills = ProfessionalSkillSerializer(many=True, read_only=True)

    class Meta:
        model = ProfessionalSkillSection
        fields = '__all__'


class SocialLinkSerializer(ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


class SocialLinkSectionSerializer(ModelSerializer):
    links = SocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = SocialLinkSection
        fields = '__all__'


class LanguageSerializer(ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class LanguageSectionSerializer(ModelSerializer):
    languages = LanguageSerializer(many=True, read_only=True)

    class Meta:
        model = LanguageSection
        fields = '__all__'


class VolunteerBulletSerializer(ModelSerializer):
    class Meta:
        model = VolunteerBullet
        fields = '__all__'


class VolunteerSerializer(ModelSerializer):
    bullets = VolunteerBulletSerializer(many=True, read_only=True)

    class Meta:
        model = Volunteer
        fields = '__all__'


class VolunteerSectionSerializer(ModelSerializer):
    volunteers = VolunteerSerializer(many=True, read_only=True)

    class Meta:
        model = VolunteerSection
        fields = '__all__'


class InterestSerializer(ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class InterestSectionSerializer(ModelSerializer):
    interests = InterestSerializer(many=True, read_only=True)

    class Meta:
        model = InterestSection
        fields = '__all__'


class CVSerializer(ModelSerializer):
    header = HeaderSerializer(read_only=True)
    summary = SummarySerializer()
    experience_section = ExperienceSectionSerializer()
    education_section = EducationSectionSerializer()
    # showcase_section = ShowcaseSectionSerializer()
    # soft_skill_section = SoftSkillSectionSerializer()
    # professional_skill_section = ProfessionalSkillSectionSerializer()
    # social_link_section = SocialLinkSectionSerializer()
    # language_section = LanguageSectionSerializer()
    # volunteer_section = VolunteerSectionSerializer()
    # interest_section = InterestSectionSerializer()

    # header = serializers.SerializerMethodField()
    class Meta:
        model = CV
        fields = '__all__'
        
    

    # def get_header(self, obj):
    #     return {
    #         'job_title': obj.header.get().job_title,
    #         'email': obj.header.get().email,
    #         'phone': obj.header.get().phone,
    #         'address': obj.header.get().address,
    #         'url_link': obj.header.get().url_link,
    #     }