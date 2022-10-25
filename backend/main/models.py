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

class Publication(models.Model):
    title = models.CharField(max_length=200)
    up_voice = models.PositiveSmallIntegerField(default=0)
    down_voice = models.PositiveSmallIntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField()
    