from rest_framework import serializers

from main.models import Publication, User, Voice


class VoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voice
        fields = [
            'user',
        ]

class PublicationSerializer(serializers.ModelSerializer):
    up_voice = VoiceSerializer(many=True, read_only=True)
    down_voice = VoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = [
            'title',
            'slug',
            'wall',
            'up_voice',
            'down_voice'
        ]


class UserSerializer(serializers.ModelSerializer):
    publications = PublicationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'description',
            'avatar',
            'header_image',
            'slug',
            'username',
            'first_name',
            'last_name',
            'publications'
        ]
