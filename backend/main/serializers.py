from rest_framework import serializers

from main.models import Publication, User


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'


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
