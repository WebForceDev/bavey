from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .serializers import FriendRequestSerializer, RelationshipsSerializer
from .models import FriendRequest, Relationships, RelationshipsTypeChoices
from auth_api.models import User


class FriendRequestListCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        outside = FriendRequest.objects.filter(recipient=request.user)
        inside = FriendRequest.objects.filter(sender=request.user)
        outside_serializer = FriendRequestSerializer(outside, many=True)
        inside_serializer = FriendRequestSerializer(inside, many=True)
        return Response({
            'outside': outside_serializer.data,
            'inside': inside_serializer.data,
        }, status=status.HTTP_200_OK)
    
    def post(self, request):
        sender_user = request.user
        recipient = get_object_or_404(User, slug=request.data['slug'])

        message = ''
        if 'message' in request.data:
            message = request.data['message']

        Relationships.objects.create(
            from_user=sender_user,
            to_user=recipient,
            relationships_type=RelationshipsTypeChoices.SUBSCRIBER
        )
        friend_request = FriendRequest.objects.create(
            sender=sender_user,
            recipient=recipient,
            message=message
        )
        return Response(FriendRequestSerializer(friend_request).data, status.HTTP_201_CREATED)


class FriendRequest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        friend_request = get_object_or_404(FriendRequest, pk=pk)
        return Response(FriendRequestSerializer(friend_request).data, status.HTTP_200_OK)
    
    def delete(self, request, pk):
        friend_request = get_object_or_404(FriendRequest, pk=pk)
        friend_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FriendRequestAccept(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        friend_request = get_object_or_404(FriendRequest, pk=pk)

        relation = get_object_or_404(Relationships, from_user=friend_request.sender, to_user=request.user)
        relation.relationships_type = RelationshipsTypeChoices.FRIEND
        relation.save()

        friend_request.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FriendRequestReject(APIView):
    permission_classes = (IsAuthenticated,)
    
    def put(self, request, pk):
        friend_request = get_object_or_404(FriendRequest, pk=pk)
        friend_request.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RelationsList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        username = request.GET.get('username')

        if username:
            user = get_object_or_404(User, username=username)

        relationships = Relationships.objects.filter(Q(from_user=user) | Q(to_user=user))  
        
        subscribers = relationships.filter(
            relationships_type=RelationshipsTypeChoices.SUBSCRIBER,
            to_user=user)
        friends = relationships.filter(relationships_type=RelationshipsTypeChoices.FRIEND)
        subscriptions = relationships.filter(
            relationships_type=RelationshipsTypeChoices.SUBSCRIBER,
            from_user=user)

        subscribers_serializer = RelationshipsSerializer(subscribers, many=True)
        friends_serializer = RelationshipsSerializer(friends, many=True)
        subscriptions_serializer = RelationshipsSerializer(subscriptions, many=True)
        return Response({
            'subscribers': subscribers_serializer.data,
            'friends': friends_serializer.data,
            'subscriptions': subscriptions_serializer.data
        }, status=status.HTTP_200_OK)


class RelationshipView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        relationship = get_object_or_404(Relationships, Q(from_user=user) | Q(to_user=user))

        return Response({
            'relationship': RelationshipsSerializer(relationship).data,
            'relationship_type': relationship.relationships_type
        }, status=status.HTTP_200_OK)


class RelationRemoveFriend(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, username):
        friend = get_object_or_404(User, username=username)
        user = request.user

        q1 = Q(from_user=user, to_user=friend)
        q2 = Q(from_user=friend, to_user=user)

        relationships = get_object_or_404(Relationships, q1 | q2)
        relationships.delete()

        Relationships.objects.create(
            from_user=friend,
            to_user=user,
            relationships_type=RelationshipsTypeChoices.SUBSCRIBER
        )

        return Response(status=status.HTTP_204_NO_CONTENT)


class RelationUnsubscribe(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, username):
        friend = get_object_or_404(User, username=username)
        user = request.user

        q1 = Q(from_user=user, to_user=friend)
        q2 = Q(from_user=friend, to_user=user)

        relationships = get_object_or_404(Relationships, q1 | q2)
        relationships.delete()

        FriendRequest.objects.filter(sender=user, recipient=friend).delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
