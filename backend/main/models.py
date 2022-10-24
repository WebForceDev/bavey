from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    description = models.TextField(
        'Description in profile header',
        max_length=30,
        null=True,
        blank=True
    )
    avatar = models.ImageField(
        upload_to='user/avatars',
        null=True,
        blank=True
    )
    header_image = models.ImageField(
        upload_to='user/header_image',
        null=True,
        blank=True
    )
