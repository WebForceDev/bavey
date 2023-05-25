from django.shortcuts import get_object_or_404
from django.db.models import QuerySet
from rest_framework.exceptions import ValidationError

from blog_api.models import User, Publication, WallTypeChoices
from blog_api.serializers import UserSerializer


class UserBlogService:
    def get_user_by_username(self, username: str) -> User:
        """
        This method get user by username.

        :param username: user's usernema.
        :return: user by username.
        """
        user = get_object_or_404(User, username=username)
        return user

    def update_user(self, username, new_data):
        user = self.get_user_by_username(username)
        serializer = UserSerializer(user, data=new_data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return serializer
        else:
            raise ValidationError(serializer.errors)

    def get_publication_from_user_wall(self, username: User) -> QuerySet[Publication]:
        """
        This method get publication from user wall.

        :param user: user from whose wall we get the publication.
        :return: list publication from user wall.
        """
        user = self.get_user_by_username(username)
        publications = Publication.objects.filter(wall_user=user)
        return publications

    def create_publication_on_user_wall(
        self, title: str, owner: User, user_wall: User
    ) -> Publication:
        """
        This method create publication on user wall.

        :param title: publication's title.
        :param owner: who create publication.
        :param user: the user on whose wall create publication.
        :return: return created publication.
        """
        publicaton = Publication()
        publicaton.title = title
        publicaton.wall_type = WallTypeChoices.USER
        publicaton.wall_user = user_wall
        publicaton.owner = owner
        publicaton.save()
        return publicaton
