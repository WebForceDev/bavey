from rest_framework import serializers

from auth_api.serializers import UserSerializer
from .models import FriendRequest


class FriendRequestSerializer(serializers.ModelSerializer):
    recipient = UserSerializer()
    sender = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = ['sender', 'recipient', 'message', 'pk']
