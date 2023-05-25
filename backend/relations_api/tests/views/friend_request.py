from rest_framework.test import APITestCase

from relations_api.models import FriendRequest
from relations_api.services.friend_request import FriendRequestService
from blog_api.models import User


class FriendRequestViewsTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="testuser1", password="testpass")
        self.user2 = User.objects.create_user(username="testuser2", password="testpass")

    def tearDown(self):
        self.user1.user_subscriptions.clear()
        self.user2.user_subscriptions.clear()
        FriendRequest.objects.all().delete()
        User.objects.all().delete()

    def test_friend_requests_list(self):
        """Should get friend request."""
        self.client.force_login(self.user1)
        response = self.client.get("/api/v1.0/relations_api/friend_requests")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "inside")
        self.assertContains(response, "outside")

    def test_create_friend_requests(self):
        """Should create friend request."""
        self.client.force_login(self.user1)
        data = {"username": self.user2.username, "message": "test text"}
        response = self.client.post("/api/v1.0/relations_api/friend_requests", data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(FriendRequest.objects.count(), 1)

    def test_get_friend_requests_by_pk(self):
        """Should get friend pk."""
        self.client.force_login(self.user1)
        friend_request = FriendRequest.objects.create(
            sender=self.user1, recipient=self.user2, message="message"
        )
        response = self.client.get(
            f"/api/v1.0/relations_api/friend_requests/{friend_request.pk}"
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "sender")
        self.assertContains(response, "recipient")

    def test_delete_friend_requests_by_pk(self):
        """Should delete friend pk."""
        self.client.force_login(self.user1)
        friend_request = FriendRequest.objects.create(
            sender=self.user1, recipient=self.user2, message="message"
        )
        response = self.client.delete(
            f"/api/v1.0/relations_api/friend_requests/{friend_request.pk}"
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(FriendRequest.objects.filter(pk=friend_request.pk).count(), 0)

    def test_accept_friend_request(self):
        """
        Should delete friend request
        add recipient user in sender user friends
        remove sender user from recipient user' subscribers
        """
        self.client.force_login(self.user1)

        friend_request_service = FriendRequestService()
        friend_request = friend_request_service.create_friend_request(
            self.user2, self.user1, ""
        )

        response = self.client.put(
            f"/api/v1.0/relations_api/friend_requests/{friend_request.pk}/accept"
        )

        self.assertEqual(response.status_code, 204)
        self.assertNotIn(friend_request, FriendRequest.objects.all())
        self.assertEqual(len(self.user2.user_subscriptions.all()), 0)
        self.assertIn(self.user1, self.user2.friends.all())

    def test_reject_friend_request(self):
        """Should delete friend request"""
        self.client.force_login(self.user1)

        friend_request_service = FriendRequestService()
        friend_request = friend_request_service.create_friend_request(
            self.user2, self.user1, ""
        )

        response = self.client.put(
            f"/api/v1.0/relations_api/friend_requests/{friend_request.pk}/reject"
        )

        self.assertEqual(response.status_code, 204)
        self.assertNotIn(friend_request, FriendRequest.objects.all())
