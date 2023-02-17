from rest_framework import serializers

from main.models import Publication, User, Voice, PublicationMedia


class VoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voice
        fields = [
            'user',
        ]


class PublicationMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationMedia
        fields = [
            'type',
            'image',
            'file'
        ]

class PublicationAutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'slug',
        ]


class PublicationSerializer(serializers.ModelSerializer):
    up_voice = VoiceSerializer(many=True, read_only=True)
    down_voice = VoiceSerializer(many=True, read_only=True)
    publication_media = PublicationMediaSerializer(many=True, read_only=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    autor = PublicationAutorSerializer(read_only=True)

    class Meta:
        model = Publication
        fields = [
            'title',
            'slug',
            'wall',
            'up_voice',
            'down_voice',
            'publication_media',
            'autor',
            'owner'
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
