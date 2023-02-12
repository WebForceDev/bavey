from rest_framework.generics import RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Publication, User, VoiceTypeChoices, Voice, PublicationMedia
from .mixins import SetVoiceMixin
from .serializers import PublicationSerializer, UserSerializer
from .permission import IsUserProfile


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

        user.publications = publications
        return user


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
