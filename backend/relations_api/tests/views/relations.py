from django.test import TestCase
from rest_framework.test import APITestCase

from relations_api.models import FriendRequest
from relations_api.relation_status import RelationStatus
from relations_api.services.friend_request import RelationsService
from blog_api.models import User


class RelationsViewsTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username="testuser1", password="testpass")
        self.user2 = User.objects.create_user(username="testuser2", password="testpass")

    def tearDown(self):
        self.user1.user_subscriptions.clear()
        self.user2.user_subscriptions.clear()
        FriendRequest.objects.all().delete()
        User.objects.all().delete()

    def test_friend_requests_list(self):
        """Should get users relations."""
        self.client.force_login(self.user1)
        response = self.client.get("/api/v1.0/relations_api/relations")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "subscribers")
        self.assertContains(response, "friends")
        self.assertContains(response, "subscriptions")

    def test_friend_requests_list(self):
        """Should get users relations."""
        self.client.force_login(self.user1)

        relations_service = RelationsService()

        relations_service.add_friend(self.user1, self.user2)
        response = self.client.get(
            f"/api/v1.0/relations_api/relations/{self.user2.username}/"
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, RelationStatus.FRIEND.value)

        relations_service.unfriend(self.user1, self.user2)
        response = self.client.get(
            f"/api/v1.0/relations_api/relations/{self.user2.username}/"
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, RelationStatus.SUBSCRIBER.value)

        relations_service.add_friend(self.user1, self.user2)
        relations_service.unfriend(self.user2, self.user1)
        response = self.client.get(
            f"/api/v1.0/relations_api/relations/{self.user2.username}/"
        )
        self.assertEqual(response.status_code, 200)
        # self.assertContains(response, RelationStatus.SUBSCRIBED.value)
        print(response.content)

    def test_unfriend(self):
        """Should romve user2 from user1's friends. And add user1 in user2's subscribe."""
        self.client.force_login(self.user1)
        relations_service = RelationsService()
        relations_service.add_friend(self.user1, self.user2)
        response = self.client.put(
            f"/api/v1.0/relations_api/relations/{self.user2.username}/removefriend"
        )
        self.assertEqual(response.status_code, 204)
        self.assertNotIn(self.user2, self.user1.friends.all())
        self.assertGreater(len(self.user2.user_subscriptions.all()), 0)

    def test_unsubscribe(self):
        """Should remove user from subscription."""
        self.client.force_login(self.user1)
        relations_service = RelationsService()
        relations_service.add_subscibe(self.user1, self.user2)
        response = self.client.put(
            f"/api/v1.0/relations_api/relations/{self.user2.username}/unsubscribe"
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(self.user1.user_subscriptions.all()), 0)
