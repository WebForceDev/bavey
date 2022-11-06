from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    description = models.TextField(
        'Description in profile header',
        null=True,
        blank=True
    )
    avatar = models.ImageField(
        upload_to='user/avatars',
        null=True,
        blank=True
    )
    header_image = models.ImageField(
        upload_to='user/header_images',
        null=True,
        blank=True
    )
    slug = models.SlugField()


class Publication(models.Model):
    title = models.CharField(max_length=200)
    up_voice = models.PositiveSmallIntegerField(default=0)
    down_voice = models.PositiveSmallIntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField()


class PublicationMedia(models.Model):
    class MediaTypeChoices(models.TextChoices):
        IMAGE = 'image'
        FILE = 'file'

    type = models.CharField(
        max_length=10,
        choices=MediaTypeChoices.choices)
    image = models.ImageField(
        upload_to='user/publication_images',
        null=True,
        blank=True
    )
    file = models.FileField(
        upload_to='user/publication_files',
        null=True,
        blank=True
    )
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
