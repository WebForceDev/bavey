from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError
from rest_framework.views import APIView

from blog_api.serializers import CommunitySerializer, PublicationSerializer, UserSerializer
from blog_api.services.community import CommunityService
from blog_api.services.publications import PublicationService
from core.permission import IsAdminOrReadOnly


class CommunityApiView(APIView):
    permission_classes = (
        IsAuthenticated,
        IsAdminOrReadOnly,
    )
    service = CommunityService()

    def get(self, request, title):
        user = self.service.get_community_by_title(title)
        return Response(CommunitySerializer(user).data)

    def patch(self, request, title):
        try:
            new_data = self.service.update_community(title, request.data)
            return Response(new_data.data)
        except ValidationError as e:
            return Response({"error": e.detail}, status=400)


class CreateCommunityApiView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]
    service = CommunityService()

    def post(self, request):
        try:
            community = self.service.create_community(
                request.user, request.data["title"]
            )
            return Response(CommunitySerializer(community).data)
        except IntegrityError as e:
            return Response({"error": str(e)}, status=400)


class CommunityPublicationApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicationSerializer
    service = CommunityService()

    def get_queryset(self):
        return self.service.get_community_publications(self.kwargs["title"])

    def get(self, request, title):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        publication_service = PublicationService()
        data = publication_service.get_serialized_publicaitons_with_voices(page)
        return Response(data)

    def post(self, request, title):
        wall_community = self.service.get_community_by_title(title)
        publication = self.service.create_publication_on_community_wall(
            request.data.get("title"), request.user, wall_community
        )
        return Response(
            PublicationSerializer(publication).data, status=status.HTTP_201_CREATED
        )


class CommunityStatisticApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, title):
        return Response(
            {"subscribers": 0, "friends": 0, "subscriptions": 0},
            status=status.HTTP_200_OK,
        )


class CommunitySubscribersApiView(APIView):
    service = CommunityService()

    def get(self, request, title):
        community = self.service.get_community_by_title(title)
        subscribers = self.service.get_communit_subscribers(community)
        return Response(UserSerializer(subscribers, many=True).data)

    def post(self, request, title):
        community = self.service.get_community_by_title(title)
        self.service.subscribe(request.user, community)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, title):
        community = self.service.get_community_by_title(title)
        self.service.unsubscribe(request.user, community)
        return Response(status=status.HTTP_204_NO_CONTENT)
