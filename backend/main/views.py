from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Publication, User
from .serializers import PublicationSerializer, UserSerializer
from .permission import IsUserProfile


class UserPublicationList(ListAPIView):
    serializer_class = PublicationSerializer
    model = Publication

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        queryset = self.model.objects.filter(owner=user_id)
        return queryset


class UserRetrieve(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class Profile(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsUserProfile)
