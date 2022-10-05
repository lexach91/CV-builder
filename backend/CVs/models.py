from django.db import models
from authorization.models import User

class CV(models.Model):
    """CV model"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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


