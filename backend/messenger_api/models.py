from django.db import models

from blog_api.models import User
from core.utils import slug_save


class Chat(models.Model):
    slug = models.SlugField(unique=True, blank=True, null=True)
    users_in_chat =  models.ManyToManyField(User, related_name='users_in_chat')

    def save(self, *args, **kwargs):
        # Create slug for this publication if slug is not exist
        slug_save(self)
        super(Chat, self).save(*args, **kwargs)


class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
