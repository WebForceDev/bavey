from rest_framework import serializers

from blog_api.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'description',
            'avatar',
            'header_image',
            'username',
            'first_name',
            'last_name',
            'country',
            'city',
        ]
