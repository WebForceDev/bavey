from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .models import Publication, User, VoiceTypeChoices, Voice, PublicationMedia, Relationships, FriendRequest, RelationshipsTypeChoices
from .mixins import SetVoiceMixin
from .serializers import PublicationSerializer, UserSerializer, RelationshipsSerializer, FriendRequestSerializer


# Retrieve user's informations and user's publications
class UserRetrieve(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'slug'

    def get_object(self):
        queryset = self.get_queryset()
        user = get_object_or_404(queryset, slug=self.kwargs['slug'])
        publications = Publication.objects.filter(wall=user)

        for publication in publications:
            publication.up_voice = Voice.objects.filter(
                type=VoiceTypeChoices.UP,
                publication=publication)
            publication.down_voice = Voice.objects.filter(
                type=VoiceTypeChoices.DOWN,
                publication=publication)
            publication.publication_media = PublicationMedia.objects.filter(publication=publication)
            publication.autor = User.objects.get(pk=publication.owner.pk)

        user.publications = publications
        return user


class UserRelationships(ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        slug = request.GET.get('slug')

        if slug:
            user = get_object_or_404(User, slug=slug)

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


class UserFriendRequests(APIView):
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


# Retrieve publication's informations
class PublicationRetrieve(RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    lookup_field = 'slug'

    def get_object(self):
        queryset = self.get_queryset()
        publication = get_object_or_404(queryset, slug=self.kwargs['slug'])

        publication.up_voice = Voice.objects.filter(
            type=VoiceTypeChoices.UP,
            publication=publication)
        publication.down_voice = Voice.objects.filter(
            type=VoiceTypeChoices.DOWN,
            publication=publication)
        publication.publication_media = PublicationMedia.objects.filter(publication=publication)  

        return publication


class CreatePublication(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        wall = get_object_or_404(User, slug=request.data['wall'])
        request.data['wall'] = wall.pk
        serializer = PublicationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                    **serializer.data,
                    "autor": {
                        "username": request.user.username,
                        "slug": request.user.slug
                    },
                    "up_voice": [],
                    "down_voice": []
                },
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Put voice on publications
class PublicationSetVoice(APIView, SetVoiceMixin):
    permission_classes = (IsAuthenticated,)
    voice_type = VoiceTypeChoices.UP

    def get(self, request, slug):
        self.set_voice(request, slug)
        voices_count = self.get_voice_count(slug)
        return Response(voices_count, status.HTTP_200_OK)


# Get user's information
class Profile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = get_object_or_404(User, pk=request.user.pk)
        publications = Publication.objects.filter(wall=user)

        for publication in publications:
            publication.up_voice = Voice.objects.filter(
                type=VoiceTypeChoices.UP,
                publication=publication)
            publication.down_voice = Voice.objects.filter(
                type=VoiceTypeChoices.DOWN,
                publication=publication)
            publication.publication_media = PublicationMedia.objects.filter(publication=publication)

        user.publications = publications
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data, status.HTTP_200_OK)
    
    def put(self, request):
        user_serializer = UserSerializer(data=request.data, instance=request.user)

        if user_serializer.is_valid():
            user_serializer.update(validated_data=request.data, instance=request.user)
            return Response(data=user_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class FriendRequestCreate(APIView): 
    permission_classes = (IsAuthenticated,)

    def post(self, request, slug):
        sender_user = request.user
        recipient = get_object_or_404(User, slug=slug)

        message = ''
        if 'message' in request.data:
            message = request.data['message']

        relation = Relationships.objects.create(
            from_user=sender_user,
            to_user=recipient,
            relationships_type=RelationshipsTypeChoices.SUBSCRIBER
        )
        friend_request = FriendRequest.objects.create(
            sender=sender_user,
            recipient=recipient,
            message=message
        )
        return Response({
            'relation': RelationshipsSerializer(relation).data,
            'friend_request': FriendRequestSerializer(friend_request).data
        }, status.HTTP_200_OK)


class FriendRequestAccept(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        sender = get_object_or_404(User, slug=slug)
        friend_request = get_object_or_404(FriendRequest, sender=sender, recipient=request.user)

        relation = get_object_or_404(Relationships, from_user=sender, to_user=request.user)
        relation.relationships_type = RelationshipsTypeChoices.FRIEND
        relation.save()

        friend_request.delete()
    
        return Response({ "Message": "User added in friends" })


class FriendRequestReject(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        sender = get_object_or_404(User, slug=slug)
        friend_request = get_object_or_404(FriendRequest, sender=sender, recipient=request.user)
        friend_request.delete()
    
        return Response({ "Message": "Friend request rejected" })
    

class RelationDeleteFriend(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        friend = get_object_or_404(User, slug=slug)
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
    
        return Response({ "Message": "User sent to subscribers" })


class RelationUnsubscribe(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        friend = get_object_or_404(User, slug=slug)
        user = request.user

        q1 = Q(from_user=user, to_user=friend)
        q2 = Q(from_user=friend, to_user=user)

        relationships = get_object_or_404(Relationships, q1 | q2)
        relationships.delete()

        FriendRequest.objects.filter(sender=user, recipient=friend).delete()

        return Response({ "Message": "Unsubscribed from the user" })


class RelationType(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        friend = get_object_or_404(User, slug=slug)
        user = request.user

        q1 = Q(from_user=user, to_user=friend)
        q2 = Q(from_user=friend, to_user=user)

        relation_type = 'nobody'
        relations = Relationships.objects.filter(q1 | q2)
        if relations.count() > 0:
            relation_type = relations.first().relationships_type

        return Response({ "relation_type": relation_type })
    

class SavedPublication(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, saved_type):
        publications = Publication.objects.filter(voice__user=request.user, voice__type=saved_type)

        for publication in publications:
            publication.up_voice = Voice.objects.filter(
                type=VoiceTypeChoices.UP,
                publication=publication)
            publication.down_voice = Voice.objects.filter(
                type=VoiceTypeChoices.DOWN,
                publication=publication)
            publication.publication_media = PublicationMedia.objects.filter(publication=publication)
            publication.autor = User.objects.get(pk=publication.owner.pk)

        return Response({'publications': PublicationSerializer(publications, many=True).data})
