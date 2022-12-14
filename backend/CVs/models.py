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
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="cvs"
    )
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
        return str(self.title)


class Header(models.Model):
    """Header model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="header"
    )
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
        return f"Header for {self.cv.title} of {self.cv.user}"

    class Meta:
        verbose_name_plural = "Headers"


class Summary(models.Model):
    """Summary model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="summary"
    )
    summary = models.TextField(
        blank=True,
        null=True,
        unique=False
    )

    def __str__(self):
        return f"Summary for {self.cv.title} of {self.cv.user}"

    class Meta:
        verbose_name_plural = "Summaries"


class ExperienceSection(models.Model):
    """ExperienceSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="experience_section"
    )

    def __str__(self):
        return f"ExperienceSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV experience of {self.experience_section.cv.user}"

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
        return f"{self.experience.experience_section.cv.user} experience"

    class Meta:
        verbose_name_plural = "Experience bullets"


class EducationSection(models.Model):
    """EducationSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="education_section"
    )

    def __str__(self):
        return f"Educations for {self.cv} of {self.cv.user}"

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
        return f"CV education of {self.education_section.cv.user}"

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
        return f"{self.education.education_section.cv.user} CV education"

    class Meta:
        verbose_name_plural = "Education bullets"


class ShowcaseSection(models.Model):
    """ShowcaseSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="showcase_section"
    )

    def __str__(self):
        return f"ShowcaseSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV showcase of {self.showcase_section.cv.user}"

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
        return f"{self.showcase.showcase_section.cv.user} CV showcase"

    class Meta:
        verbose_name_plural = "Project bullets"


class SoftSkillSection(models.Model):
    """SoftSkillSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="soft_skill_section"
    )

    def __str__(self):
        return f"SoftSkillSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV soft skill of {self.soft_skill_section.cv.user}"

    class Meta:
        verbose_name_plural = "Soft skills"


class ProfessionalSkillSection(models.Model):
    """HardSkillSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="professional_skill_section"
    )

    def __str__(self):
        return f"ProfessionalSkill for {self.cv.title} of {self.cv.user}"

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
        return f"{self.professional_skill_section.cv.user} professional skill"

    class Meta:
        verbose_name_plural = "Professional skills"


class SocialLinkSection(models.Model):
    """SocialLinkSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="social_link_section"
    )

    def __str__(self):
        return f"SocialLinkSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV social link of {self.social_link_section.cv.user}"

    class Meta:
        verbose_name_plural = "Social links"


class LanguageSection(models.Model):
    """LanguageSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="language_section"
    )

    def __str__(self):
        return f"LanguageSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV language of {self.language_section.cv.user}"

    class Meta:
        verbose_name_plural = "Languages"


class VolunteerSection(models.Model):
    """VolunteerSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="volunteer_section"
    )

    def __str__(self):
        return f"VolunteerSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV volunteer of {self.volunteer_section.cv.user}"

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
        return f"{self.volunteer.volunteer_section.cv.user} volunteer bullet"

    class Meta:
        verbose_name_plural = "Volunteer bullets"


class InterestSection(models.Model):
    """InterestSection model"""
    cv = models.ForeignKey(
        CV,
        on_delete=models.CASCADE,
        related_name="interest_section"
    )

    def __str__(self):
        return f"InterestSection for {self.cv.title} of {self.cv.user}"

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
        return f"CV interest of {self.interest_section.cv.user}"

    class Meta:
        verbose_name_plural = "Interests"
