from django.shortcuts import get_object_or_404
from django.db.models import QuerySet

from ..models import FriendRequest
from ..serializers import FriendRequestSerializer
from .relations import RelationsService
from blog_api.models import User


class FriendRequestService:
    """This is a class for managing freiend request."""

    def create_friend_request(self, sender_user: User, recipient_user: User, message: str=None) -> FriendRequest:
        """
        This method does create friend request.

        :param sender_user: The user who send friend request.
        :param recipient_user:  The user who received friend request.
        :param message:  Message from sender user.
        :return:  FriendRequest from sender to recipient.
        """
        friend_request_message = ""
        if message:
            friend_request_message = message

        relation_service = RelationsService()
        relation_service.add_subscibe(sender_user, recipient_user)

        friend_request = FriendRequest.objects.create(
            sender=sender_user, recipient=recipient_user, message=friend_request_message
        )
        return friend_request

    def delete_friend_request(self, friend_request_pk: int) -> None:
        """
        This method does delete friend request by pk.

        :param friend_request_pk: deleted friend request by pk.
        """
        friend_request = self.get_friend_request_by_pk(friend_request_pk)
        friend_request.delete()

    def get_friend_request_by_pk(self, friend_request_pk: int) -> None:
        """
        This method does get friend request by pk.

        :param friend_request_pk: get friend request by pk.
        """
        return get_object_or_404(FriendRequest, pk=friend_request_pk)

    def accept_friend_request(self, user: User, friend_request_pk: int) -> None:
        """
        This method delete friend request
        add recipient user in sender user friends
        remove sender user from recipient user' subscribers

        :param user: recipient user.
        :param friend_request_pk: friend request for accept.
        """
        friend_request = self.get_friend_request_by_pk(friend_request_pk)
        relation_service = RelationsService()
        relation_service.add_friend(friend_request.sender, user)
        relation_service.remove_subscribe(friend_request.sender, user)
        self.delete_friend_request(friend_request.pk)

    def reject_friend_request(self, friend_request_pk: int) -> None:
        """
        This method delete friend request

        :param friend_request_pk: friend request for reject.
        """
        self.delete_friend_request(friend_request_pk)

    def get_outside_friend_request(self, user: User) -> QuerySet[FriendRequest]:
        """
        This method get outside friend requests for user

        :param user: user whose outside friend requests get.
        """
        return FriendRequest.objects.filter(recipient=user)

    def get_inside_friend_request(self, user):
        """
        This method get inside friend requests for user

        :param user: user whose inside friend requests get.
        """
        return FriendRequest.objects.filter(sender=user)

    def get_friend_requests_serialized(self, user):
        outside = self.get_outside_friend_request(user)
        inside = self.get_inside_friend_request(user)

        outside_serializer = FriendRequestSerializer(outside, many=True)
        inside_serializer = FriendRequestSerializer(inside, many=True)

        return {
            "outside": outside_serializer.data,
            "inside": inside_serializer.data,
        }
