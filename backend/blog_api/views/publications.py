from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from ..models import Publication
from ..serializers import PublicationSerializer
from core.permission import IsOwnerOrReadOnly
from blog_api.services.publications import PublicationService


class PublicationsApiView(APIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    service = PublicationService()

    def get(self, request, slug):
        publication = self.service.get_publication_by_slug(slug)
        data = self.service.get_serialized_publicaitons_with_voices([publication])

        return Response(data, status=status.HTTP_200_OK)


class SavedPublication(APIView):
    service = PublicationService()

    def get(self, request):
        voices_up = request.user.voices_up.all()
        voices_down = request.user.voices_down.all()
        bookmarks = request.user.bookmarks.all()

        voices_up_serialized = self.service.get_serialized_publicaitons_with_voices(
            voices_up
        )
        voices_down_serialized = self.service.get_serialized_publicaitons_with_voices(
            voices_down
        )
        bookmarks_serialized = self.service.get_serialized_publicaitons_with_voices(
            bookmarks
        )

        return Response(
            {
                "saved_voices_up": voices_up_serialized,
                "saved_voices_down": voices_down_serialized,
                "saved_bookmarks": bookmarks_serialized,
            },
            status=status.HTTP_200_OK,
        )
