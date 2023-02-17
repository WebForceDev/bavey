from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string


def slug_save(obj):
    if not obj.slug:
        obj.slug = get_random_string(15)
        slug_is_wrong = True
        while slug_is_wrong:
            slug_is_wrong = False
            other_objs_with_slug = type(obj).objects.filter(slug=obj.slug)
            if len(other_objs_with_slug) > 0:
                slug_is_wrong = True
            if slug_is_wrong:
                obj.slug = get_random_string(5)

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
    slug = models.SlugField(unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        slug_save(self)
        super(User, self).save(*args, **kwargs)


class Publication(models.Model):
    title = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    slug = models.SlugField(unique=True, blank=True, null=True)
    # The wall is where the post is displayed
    wall = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wall')

    def save(self, *args, **kwargs):
        slug_save(self)
        super(Publication, self).save(*args, **kwargs)


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
