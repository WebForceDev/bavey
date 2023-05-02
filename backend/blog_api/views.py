from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from .models import Publication, Voice, VoiceTypeChoices
from .serializers import PublicationSerializer, VoiceSerializer
from .permission import IsOwnerOrReadOnlu


class PublicationsApiView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnlu)
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    lookup_field = 'slug'


class VoicesApiView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete_voice(self, publication_slug, user):
        publication = get_object_or_404(Publication, slug=publication_slug)
        voice = get_object_or_404(Voice, user=user, publication=publication)
        voice.delete()

    def get(self, request, publication_slug):
        publication = get_object_or_404(Publication, slug=publication_slug)
        voices_up = Voice.objects.filter(publication=publication, type=VoiceTypeChoices.UP)
        voices_down = Voice.objects.filter(publication=publication, type=VoiceTypeChoices.DOWN)
        return Response({
            'voices_up': VoiceSerializer(voices_up, many=True).data,
            'voices_down': VoiceSerializer(voices_down, many=True).data,
        }, status=status.HTTP_200_OK)
    
    def delete(self, request, publication_slug):
        self.delete_voice(publication_slug, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request, publication_slug):
        publication = get_object_or_404(Publication, slug=publication_slug)

        if Voice.objects.filter(publication=publication, user=request.user).exists():
            self.delete_voice(publication_slug, request.user)

        new_voice = Voice.objects.create(
            publication=publication,
            user=request.user,
            type=request.data['voice_type']
        )
        return Response(VoiceSerializer(new_voice).data,status=status.HTTP_201_CREATED)
