from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from blog_api.models import User
from ..services.relations import RelationsService
from ..services.friend_request import FriendRequestService
from core.permission import IsAuthenticatedOrReadOnly
from relations_api.models import FriendRequest


class RelationsList(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    relations_service = RelationsService()

    def get(self, request):
        user = request.user
        username = request.GET.get('username')

        if username:
            user = get_object_or_404(User, username=username)

        data = self.relations_service.get_user_relations_serialized(user)
        return Response(data, status=status.HTTP_200_OK)


class RelationshipView(APIView):
    relations_service = RelationsService()

    def get(self, request, username):
        user = get_object_or_404(User, username=username)

        if not request.user.is_authenticated:
            return Response({
                'relationship_type': 'no_auth'
            }, status=status.HTTP_200_OK)

        relation_type = self.relations_service.get_relation_type(
            request.user,
            user
        )

        return Response({
            'relationship_type': relation_type.value
        }, status=status.HTTP_200_OK)


class RelationRemoveFriend(APIView):
    permission_classes = (IsAuthenticated,)
    relations_service = RelationsService()

    def put(self, request, username):
        friend = get_object_or_404(User, username=username)
        user = request.user

        self.relations_service.unfriend(user, friend)

        return Response(status=status.HTTP_204_NO_CONTENT)


class RelationUnsubscribe(APIView):
    permission_classes = (IsAuthenticated,)
    relations_service = RelationsService()

    def put(self, request, username):
        friend = get_object_or_404(User, username=username)
        user = request.user

        friend_request = FriendRequest.objects.filter(
            sender=user,
            recipient=friend
        )
        if len(friend_request) > 0:
            friend_request.delete()
        
        self.relations_service.remove_subscribe(user, friend)

        return Response(status=status.HTTP_204_NO_CONTENT)
