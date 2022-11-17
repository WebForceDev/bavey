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
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField()

class MediaTypeChoices(models.TextChoices):
    IMAGE = 'image'
    FILE = 'file'

class PublicationMedia(models.Model):
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

class VoiceTypeChoices(models.TextChoices):
    DOWN = 'down'
    UP = 'up'
    BOOKMARK = 'bookmark'

class Voice(models.Model):
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(
        max_length=10,
        choices=VoiceTypeChoices.choices)
