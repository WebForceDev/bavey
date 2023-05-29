from django.contrib import admin

from .models import ChatMessage, Chat


admin.site.register(ChatMessage)
admin.site.register(Chat)
