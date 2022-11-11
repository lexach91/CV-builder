# Generated by Django 4.1.1 on 2022-11-08 06:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("CVs", "0005_alter_experience_experience_section"),
    ]

    operations = [
        migrations.AlterField(
            model_name="experience",
            name="experience_section",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="experiences",
                to="CVs.experiencesection",
            ),
        ),
    ]