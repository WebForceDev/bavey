from django.test import TestCase

from relations_api.services.friend_request import FriendRequestService
from relations_api.models import FriendRequest
from blog_api.models import User


class FriendRequestServiceTests(TestCase):
    service = FriendRequestService()

    def setUp(self):
        self.user1 = User.objects.create_user(username="testuser1", password="testpass")
        self.user2 = User.objects.create_user(username="testuser2", password="testpass")

    def tearDown(self):
        self.user1.user_subscriptions.clear()
        FriendRequest.objects.all().delete()
        User.objects.all().delete()

    def test_create_friend_request(self):
        """Should  create friend request from user1 to user2."""

        message = "test create friend requset"
        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2, message=message
        )
        self.assertEqual(friend_request.sender.username, self.user1.username)
        self.assertEqual(friend_request.recipient.username, self.user2.username)
        self.assertEqual(friend_request.message, message)

        friend_request2 = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        self.assertEqual(friend_request2.message, "")

    def test_delete_friend_request(self):
        """Should delete friend request."""

        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        self.service.delete_friend_request(friend_request.pk)
        self.assertNotIn(friend_request, FriendRequest.objects.all())

    def test_get_friend_request(self):
        """Should get friend request."""

        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        self.service.get_friend_request_by_pk(friend_request.pk)
        self.assertEqual(friend_request, friend_request)

    def test_accept_friend_request(self):
        """
        Should delete friend request
        add recipient user in sender user friends
        remove sender user from recipient user' subscribers
        """

        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        self.service.accept_friend_request(self.user2, friend_request.pk)
        self.assertNotIn(friend_request, FriendRequest.objects.all())
        self.assertEqual(len(self.user2.user_subscriptions.all()), 0)
        self.assertIn(self.user2, self.user1.friends.all())

    def test_reject_friend_request(self):
        """Should delete friend request"""

        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        self.service.reject_friend_request(friend_request.pk)
        self.assertNotIn(friend_request, FriendRequest.objects.all())

    def test_get_outside_friends_requests(self):
        """Should get outside friend request"""
        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        user1_outside_friend_request = self.service.get_outside_friend_request(
            self.user1
        )
        user2_outside_friend_request = self.service.get_outside_friend_request(
            self.user2
        )
        self.assertIn(friend_request, user2_outside_friend_request)
        self.assertNotIn(friend_request, user1_outside_friend_request)

    def test_get_inside_friends_requests(self):
        """Should get inside friend request"""
        friend_request = self.service.create_friend_request(
            sender_user=self.user1, recipient_user=self.user2
        )
        user1_inside_friend_request = self.service.get_inside_friend_request(self.user1)
        user2_inside_friend_request = self.service.get_inside_friend_request(self.user2)
        self.assertNotIn(friend_request, user2_inside_friend_request)
        self.assertIn(friend_request, user1_inside_friend_request)
