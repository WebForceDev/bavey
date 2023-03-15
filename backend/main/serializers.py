from rest_framework import serializers

from main.models import Publication, User, Voice, PublicationMedia, Relationships, FriendRequest, Community


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
            'country',
            'city',
            'publications'
        ]


class RelationshipsSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    to_user = UserSerializer()

    class Meta:
        model = Relationships
        fields = ['from_user', 'to_user', 'relationships_type']


class FriendRequestSerializer(serializers.ModelSerializer):
    recipient = UserSerializer()
    sender = UserSerializer()

    class Meta:
        model = FriendRequest
        fields = ['sender', 'recipient', 'message']


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['name', 'description', 'slug', 'creation_date']
