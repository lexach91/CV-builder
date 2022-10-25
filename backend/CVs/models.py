from django.db import models
from authorization.models import User


class Theme(models.Model):
    """docstring for Theme"""
    name = models.CharField(max_length=50)
    path = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class CV(models.Model):
    """CV model"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    cv_themes = models.ForeignKey(
        Theme,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title


class Header(models.Model):
    """Header model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)
    job_title = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )  
    email = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    phone = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    address = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    url_link = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Headers"


class Summary(models.Model):
    """Summary model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)
    summary = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.summary

    class Meta:
        verbose_name_plural = "Summaries"


class ExperienceSection(models.Model):
    """ExperienceSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "ExperienceSections"

    class Meta:
        verbose_name_plural = "ExperienceSections"


class Experience(models.Model):
    """Experience model"""
    experience_section = models.ForeignKey(
        ExperienceSection,
        on_delete=models.CASCADE,
        related_name="experiences"
    )
    company = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    position = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    start_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    end_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    description = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.company

    class Meta:
        verbose_name_plural = "Experiences"


class ExperienceBullet(models.Model):
    """Experience bullet model"""
    experience = models.ForeignKey(
        Experience,
        on_delete=models.CASCADE,
        related_name="experience_bullets"
    )
    bullet = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.bullet

    class Meta:
        verbose_name_plural = "Job bullets"


class EducationSection(models.Model):
    """EducationSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "EducationSections"


class Education(models.Model):
    """Education model"""
    education_section = models.ForeignKey(
        EducationSection,
        on_delete=models.CASCADE,
        related_name="educations"
    )
    school = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    specialization = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    scores = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    start_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    end_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.school

    class Meta:
        verbose_name_plural = "Education"


class EducationBullet(models.Model):
    """Education bullet model"""
    education = models.ForeignKey(
        Education,
        on_delete=models.CASCADE,
        related_name="education_bullets"
    )
    bullet = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.bullet

    class Meta:
        verbose_name_plural = "Education bullets"


class ShowcaseSection(models.Model):
    """ShowcaseSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "ShowcaseSections"


class Showcase(models.Model):
    """Project model"""
    showcase_section = models.ForeignKey(
        ShowcaseSection,
        on_delete=models.CASCADE,
        related_name="showcases"
    )
    name = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    description = models.TextField(
        blank=True,
        null=True,
        unique=False
    )
    url = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    start_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    end_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Projects"


class ShowcaseBullet(models.Model):
    """Project bullet model"""
    showcase = models.ForeignKey(
        Showcase,
        on_delete=models.CASCADE,
        related_name="showcase_bullets"
    )
    bullet = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.bullet

    class Meta:
        verbose_name_plural = "Project bullets"


class SoftSkillSection(models.Model):
    """SoftSkillSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Soft skill sections"


class SoftSkill(models.Model):
    """SoftSkill model"""
    soft_skill_section = models.ForeignKey(
        SoftSkillSection,
        on_delete=models.CASCADE,
        related_name="soft_skills"
    )
    soft_skill = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.soft_skill

    class Meta:
        verbose_name_plural = "Soft skills"


class ProfessionalSkillSection(models.Model):
    """HardSkillSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Professional Skill sections"


class ProfessionalSkill(models.Model):
    """Professional skill model"""
    professional_skill_section = models.ForeignKey(
        ProfessionalSkillSection,
        on_delete=models.CASCADE,
        related_name="professional_skills"
    )
    skill = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.skills

    class Meta:
        verbose_name_plural = "Professional skills"


class SocialLinkSection(models.Model):
    """SocialLinkSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Social link sections"

class SocialLink(models.Model):
    """Social link model"""
    social_link_section = models.ForeignKey(
        SocialLinkSection,
        on_delete=models.CASCADE,
        related_name="social_links"
    )
    name = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    url = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Social links"


class LanguageSection(models.Model):
    """LanguageSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Language sections"

class Language(models.Model):
    """Language model"""
    language_section = models.ForeignKey(
        LanguageSection,
        on_delete=models.CASCADE,
        related_name="languages"
    )
    language = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    level = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.language

    class Meta:
        verbose_name_plural = "Languages"


class VolunteerSection(models.Model):
    """VolunteerSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Volunteer sections"


class Volunteer(models.Model):
    """Volunteer model"""
    volunteer_section = models.ForeignKey(
        VolunteerSection,
        on_delete=models.CASCADE,
        related_name="volunteers"
    )
    organization = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    position = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    start_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    end_date = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )
    description = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.organization

    class Meta:
        verbose_name_plural = "Volunteers"


class VolunteerBullet(models.Model):
    """Volunteer bullet model"""
    volunteer = models.ForeignKey(
        Volunteer,
        on_delete=models.CASCADE,
        related_name="volunteer_bullets"
    )
    bullet = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.bullet

    class Meta:
        verbose_name_plural = "Volunteer bullets"


class InterestSection(models.Model):
    """InterestSection model"""
    cv = models.ForeignKey(CV, on_delete=models.CASCADE)

    def __str__(self):
        return self.cv

    class Meta:
        verbose_name_plural = "Interest sections"


class Interest(models.Model):
    """Interest model"""
    interest_section = models.ForeignKey(
        InterestSection,
        on_delete=models.CASCADE,
        related_name="interests"
    )
    interest = models.CharField(
        max_length=500,
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return self.interest

    class Meta:
        verbose_name_plural = "Interests"
