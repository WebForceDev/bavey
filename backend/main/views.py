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

