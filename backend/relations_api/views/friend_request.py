from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..serializers import FriendRequestSerializer
from ..services.friend_request import FriendRequestService
from blog_api.services.user_blog import UserBlogService


class FriendRequestListCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        friend_request_service = FriendRequestService()
        user = request.user
        data = friend_request_service.get_friend_requests_serialized(user)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        friend_request_service = FriendRequestService()
        user_blog_service = UserBlogService()
        recipient_user = user_blog_service.get_user_by_username(request.data['username'])

        friend_request = friend_request_service.create_friend_request(
            request.user,
            recipient_user,
            request.data['message'])

        return Response(FriendRequestSerializer(friend_request).data, status.HTTP_201_CREATED)


class FriendRequestAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    friend_request_service = FriendRequestService()

    def get(self, request, pk):
        friend_request = self.friend_request_service.get_friend_request_by_pk(pk)
        return Response(FriendRequestSerializer(friend_request).data, status.HTTP_200_OK)
    
    def delete(self, request, pk):
        self.friend_request_service.delete_friend_request(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FriendRequestAccept(APIView):
    permission_classes = (IsAuthenticated,)
    friend_request_service = FriendRequestService()

    def put(self, request, pk):
        self.friend_request_service.accept_friend_request(
            request.user, 
            pk
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FriendRequestReject(APIView):
    permission_classes = (IsAuthenticated,)
    friend_request_service = FriendRequestService()
    
    def put(self, request, pk):
        self.friend_request_service.reject_friend_request(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
