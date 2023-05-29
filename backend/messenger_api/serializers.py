from rest_framework import serializers

from .models import ChatMessage, Chat


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = [
            'message',
            'user'
        ]

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = [
            'slug'
        ]
