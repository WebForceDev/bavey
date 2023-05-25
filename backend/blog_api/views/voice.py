from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from blog_api.services.voices import VoicesService
from blog_api.services.publications import PublicationService


class VoicesApiView(APIView):
    permission_classes = (IsAuthenticated,)
    service = VoicesService()

    def delete(self, request, publication_slug):
        publication_service = PublicationService()
        publication = publication_service.get_publication_by_slug(publication_slug)
        self.service.delete_voice(request.user, request.data["voice_type"], publication)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, publication_slug):
        publication_service = PublicationService()
        publication = publication_service.get_publication_by_slug(publication_slug)
        self.service.add_voice(request.data["voice_type"], request.user, publication)
        return Response(status=status.HTTP_204_NO_CONTENT)
