from rest_framework.generics import ListAPIView

from .models import Publication
from .serializers import PublicationSerializer


class UserPublicationList(ListAPIView):
    serializer_class = PublicationSerializer
    model = Publication
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = self.model.objects.filter(owner=user_id)
        return queryset
