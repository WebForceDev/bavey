from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import ValidationError

from auth_api.serializers import UserSerializer
from blog_api.services.user_blog import UserBlogService
from blog_api.services.publications import PublicationService
from blog_api.models import Publication, Subscription
from ..serializers import PublicationSerializer
from core.permission import IsProfileOrReadOnly, IsAuthenticatedOrReadOnly


class UserApiView(APIView):
    permission_classes = (
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
    permission_classes = (IsAuthenticatedOrReadOnly, )
    serializer_class = PublicationSerializer
    service = UserBlogService()

    def get_queryset(self):
        return self.service.get_publication_from_user_wall(self.kwargs["username"])

    def get(self, request, username):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        publication_service = PublicationService()
        data = publication_service.get_serialized_publicaitons_with_voices(page)
        return Response(data)

    def post(self, request, username):
        wall_user = self.service.get_user_by_username(username)
        print(request.FILES)
        
        publication = self.service.create_publication_on_user_wall(
            request.data.get("title"), request.user, wall_user, request.FILES
        )
        return Response(
            PublicationSerializer(publication).data, status=status.HTTP_201_CREATED
        )


class UserStatisticApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    service = UserBlogService()

    def get(self, request, username):
        user = self.service.get_user_by_username(username)
        subscriptions = user.user_subscriptions.all()
        friends = user.friends.all()
        publications = Publication.objects.filter(wall_user=user)
        subscribers  = Subscription.objects.filter(subscription_user=user)
        return Response(
            {
                "subscriptions": len(subscriptions),
                "subscribers": len(subscribers),
                "friends": len(friends),
                "publications": len(publications)
            },
            status=status.HTTP_200_OK,
        )
