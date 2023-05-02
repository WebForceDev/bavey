from django.db import models
from django.contrib.auth.models import AbstractUser

from core.utils import slug_save


class User(AbstractUser):
    description = models.TextField(
        "Description in profile header", null=True, blank=True
    )
    avatar = models.ImageField(upload_to="user/avatars", null=True, blank=True)
    # header_image is image from user page
    header_image = models.ImageField(
        upload_to="user/header_images", null=True, blank=True
    )
    country = models.CharField(max_length=50, default="", blank=True)
    city = models.CharField(max_length=50, default="", blank=True)

    # Saved publications
    voices_up = models.ManyToManyField(
        "Publication", related_name="voices_up", blank=True
    )
    voices_down = models.ManyToManyField(
        "Publication", related_name="voices_down", blank=True
    )
    bookmarks = models.ManyToManyField(
        "Publication", related_name="bookmarks", blank=True
    )

    # User relations
    friends = models.ManyToManyField("self", blank=True)
    user_subscriptions = models.ManyToManyField("Subscription", blank=True)


class Subscription(models.Model):
    subscription_user = models.ForeignKey(User, on_delete=models.CASCADE)


class Community(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    # Owner is user who create this community
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="community_owner"
    )
    # Admin is users who can create publications in this community
    admins = models.ManyToManyField(User, related_name="admin", blank=True)
    subscribers = models.ManyToManyField(User, related_name="subscribers", blank=True)

    def save(self, *args, **kwargs):
        # auto add owner in admins and subscribers
        self.admins.add(self.owner)
        self.subscribers.add(self.owner)
        super(User, self).save(*args, **kwargs)


class WallTypeChoices(models.TextChoices):
    USER = "user"
    COMMUNITY = "community"


class Publication(models.Model):
    title = models.CharField(max_length=200)
    # Owner is user who create this publication
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    slug = models.SlugField(unique=True, blank=True, null=True)
    creation_date = models.DateField(auto_now_add=True)

    # The wall is where the post is displayed
    wall_type = models.CharField(max_length=10, choices=WallTypeChoices.choices)
    wall_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="wall_user", null=True, blank=True
    )
    wall_community = models.ForeignKey(
        Community,
        on_delete=models.CASCADE,
        related_name="wall_community",
        null=True,
        blank=True,
    )

    def save(self, *args, **kwargs):
        # Create slug for this publication if slug is not exist
        slug_save(self)
        super(Publication, self).save(*args, **kwargs)


class MediaTypeChoices(models.TextChoices):
    IMAGE = "image"
    FILE = "file"


class PublicationMedia(models.Model):
    type = models.CharField(max_length=10, choices=MediaTypeChoices.choices)
    image = models.ImageField(
        upload_to="user/publication_images", null=True, blank=True
    )
    file = models.FileField(upload_to="user/publication_files", null=True, blank=True)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
