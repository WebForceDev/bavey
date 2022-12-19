from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Publication, User, VoiceTypeChoices
from .mixins import SetVoiceMixin
from .serializers import PublicationSerializer, UserSerializer
from .permission import IsUserProfile


# List user's publications
class UserPublicationList(ListAPIView):
    serializer_class = PublicationSerializer
    model = Publication

    def get_queryset(self):
        user_slug = self.kwargs['slug']
        user = get_object_or_404(User, slug=user_slug)
        queryset = self.model.objects.filter(owner=user)
        return queryset


# Retrieve user's informations
class UserRetrieve(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'slug'


# User profile
class Profile(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsUserProfile)
    lookup_field = 'slug'

# Retrieve publication's informations
class PublicationRetrieve(RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer


# Put voice on publications
class PublicationSetVoice(APIView, SetVoiceMixin):
    permission_classes = (IsAuthenticated,)
    voice_type = VoiceTypeChoices.UP

    def get(self, request, publication_pk):
        self.set_voice(request, publication_pk)
        up_voice_count = self.get_voice_count(publication_pk)
        return Response({f'{self.voice_type}_voice_count': up_voice_count}, status.HTTP_200_OK)
