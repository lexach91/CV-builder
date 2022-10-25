from rest_framework.serializers import ModelSerializer
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
        fields = ("job_title", "email", "phone", "address", "url_link")


class SummarySerializer(ModelSerializer):
    class Meta:
        model = Summary
        fields = ("summary",)


class ExperienceBulletSerializer(ModelSerializer):
    class Meta:
        model = ExperienceBullet
        fields = ("bullet",)


class ExperienceSerializer(ModelSerializer):
    bullets = ExperienceBulletSerializer(many=True)

    class Meta:
        model = Experience
        fields = (
            "company",
            "position",
            "start_date",
            "end_date",
            "description",
            "bullets",
        )


class ExperienceSectionSerializer(ModelSerializer):
    experiences = ExperienceSerializer(many=True)

    class Meta:
        model = ExperienceSection
        fields = ("experiences",)


class EducationBulletSerializer(ModelSerializer):
    class Meta:
        model = EducationBullet
        fields = ("bullet",)


class EducationSerializer(ModelSerializer):
    bullets = EducationBulletSerializer(many=True)

    class Meta:
        model = Education
        fields = (
            "school",
            "specialization",
            "scores",
            "start_date",
            "end_date",
            "bullets",
        )


class EducationSectionSerializer(ModelSerializer):
    educations = EducationSerializer(many=True)

    class Meta:
        model = EducationSection
        fields = ("educations",)


class ShowcaseBulletSerializer(ModelSerializer):
    class Meta:
        model = ShowcaseBullet
        fields = ("bullet",)


class ShowcaseSerializer(ModelSerializer):
    bullets = ShowcaseBulletSerializer(many=True)

    class Meta:
        model = Showcase
        fields = (
            "name",
            "description",
            "url",
            "start_date",
            "end_date",
            "bullets",
        )


class ShowcaseSectionSerializer(ModelSerializer):
    showcases = ShowcaseSerializer(many=True)

    class Meta:
        model = ShowcaseSection
        fields = ("showcases",)


class SoftSkillSerializer(ModelSerializer):
    class Meta:
        model = SoftSkill
        fields = ("soft_skill",)


class SoftSkillSectionSerializer(ModelSerializer):
    skills = SoftSkillSerializer(many=True)

    class Meta:
        model = SoftSkillSection
        fields = ("skills",)


class ProfessionalSkillSerializer(ModelSerializer):
    class Meta:
        model = ProfessionalSkill
        fields = ("skill",)


class ProfessionalSkillSectionSerializer(ModelSerializer):
    skills = ProfessionalSkillSerializer(many=True)

    class Meta:
        model = ProfessionalSkillSection
        fields = ("skills",)


class SocialLinkSerializer(ModelSerializer):
    class Meta:
        model = SocialLink
        fields = (
            "name",
            "url",
        )


class SocialLinkSectionSerializer(ModelSerializer):
    links = SocialLinkSerializer(many=True)

    class Meta:
        model = SocialLinkSection
        fields = ("links",)


class LanguageSerializer(ModelSerializer):
    class Meta:
        model = Language
        fields = (
            "language",
            "level",
        )


class LanguageSectionSerializer(ModelSerializer):
    languages = LanguageSerializer(many=True)

    class Meta:
        model = LanguageSection
        fields = ("languages",)


class VolunteerBulletSerializer(ModelSerializer):
    class Meta:
        model = VolunteerBullet
        fields = ("bullet",)


class VolunteerSerializer(ModelSerializer):
    bullets = VolunteerBulletSerializer(many=True)

    class Meta:
        model = Volunteer
        fields = (
            "organization",
            "position",
            "start_date",
            "end_date",
            "description",
            "bullets",
        )


class VolunteerSectionSerializer(ModelSerializer):
    volunteers = VolunteerSerializer(many=True)

    class Meta:
        model = VolunteerSection
        fields = ("volunteers",)


class InterestSerializer(ModelSerializer):
    class Meta:
        model = Interest
        fields = ("interest",)


class InterestSectionSerializer(ModelSerializer):
    interests = InterestSerializer(many=True)

    class Meta:
        model = InterestSection
        fields = ("interests",)


class CVSerializer(ModelSerializer):
    header = HeaderSerializer()
    summary = SummarySerializer()
    experience_section = ExperienceSectionSerializer()
    education_section = EducationSectionSerializer()
    showcase_section = ShowcaseSectionSerializer()
    soft_skill_section = SoftSkillSectionSerializer()
    professional_skill_section = ProfessionalSkillSectionSerializer()
    social_link_section = SocialLinkSectionSerializer()
    language_section = LanguageSectionSerializer()
    volunteer_section = VolunteerSectionSerializer()
    interest_section = InterestSectionSerializer()

    class Meta:
        model = CV
        fields = (
            "header",
            "summary",
            "experience_section",
            "education_section",
            "showcase_section",
            "soft_skill_section",
            "professional_skill_section",
            "social_link_section",
            "language_section",
            "volunteer_section",
            "interest_section",
        )
