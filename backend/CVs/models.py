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

