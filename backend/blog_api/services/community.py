from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.db.models import QuerySet

from blog_api.models import Community, Publication, WallTypeChoices, User
from blog_api.serializers import CommunitySerializer


class CommunityService:
    def get_community_by_title(self, title: str) -> Community:
        """
        This method get community by title.

        :param title: community's title.
        :return: community by title.
        """
        community = get_object_or_404(Community, title=title)
        return community

    def get_community_publications(self, community_title: str) -> QuerySet[Publication]:
        """
        This method get publication from community wall.

        :param community: community from whose wall we get the publication.
        :return: list publication from community wall.
        """
        community = self.get_community_by_title(community_title)
        publications = Publication.objects.filter(wall_community=community)
        return publications

    def create_publication_on_community_wall(
        self, title: str, owner: User, wall_community: Community
    ) -> Publication:
        """
        This method create publication on user wall.

        :param title: publication's title.
        :param owner: who create publication.
        :param community: the community on whose wall create publication.
        :return: return created publication.
        """
        publicaton = Publication()
        publicaton.title = title
        publicaton.wall_type = WallTypeChoices.COMMUNITY
        publicaton.wall_community = wall_community
        publicaton.owner = owner
        publicaton.save()
        return publicaton

    def update_community(self, title, new_data):
        community = self.get_community_by_title(title)
        serializer = CommunitySerializer(community, data=new_data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return serializer
        else:
            raise ValidationError(serializer.errors)

    def create_community(self, user: User, community_title: str) -> Community:
        community = Community()
        community.title = community_title
        community.owner = user
        community.save()
        return community

    def get_communit_subscribers(self, community: Community) -> QuerySet[User]:
        subscribers = community.subscribers.all()
        return subscribers

    def subscribe(self, user: User, community: Community) -> None:
        community.subscribers.add(user)
        community.save()

    def unsubscribe(self, user: User, community: Community) -> None:
        community.subscribers.remove(user)
        community.save()
