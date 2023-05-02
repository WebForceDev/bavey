from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError

from auth_api.serializers import UserSerializer
from blog_api.services.user_blog import UserBlogService
from blog_api.services.publications import PublicationService
from ..serializers import PublicationSerializer
from core.permission import IsProfileOrReadOnly


class UserApiView(APIView):
    permission_classes = (
        IsAuthenticated,
        IsProfileOrReadOnly,
    )
    service = UserBlogService()

    def get(self, request, username):
        user = self.service.get_user_by_username(username)
        return Response(UserSerializer(user).data)

    def patch(self, request, username):
        try:
            new_data = self.service.update_user(username, request.data)
            return Response(new_data.data)
        except ValidationError as e:
            return Response({"error": e.detail}, status=400)


class UserPublicationApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicationSerializer
    service = UserBlogService()

    def get_queryset(self):
        return self.service.get_publication_from_user_wall(self.kwargs["username"])

    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        publication_service = PublicationService()
        data = publication_service.get_serialized_publicaitons_with_voices(page)
        return Response(data)

    def post(self, request, username):
        wall_user = self.service.get_user_by_username(username)
        publication = self.service.create_publication_on_user_wall(
            request.data.get("title"), request.user, wall_user
        )
        return Response(
            PublicationSerializer(publication).data, status=status.HTTP_201_CREATED
        )


class UserStatisticApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        return Response(
            {"subscribers": 0, "friends": 0, "subscriptions": 0},
            status=status.HTTP_200_OK,
        )
