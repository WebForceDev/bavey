from django.test import TestCase

from relations_api.services.relations import RelationsService
from relations_api.relation_status import RelationStatus
from blog_api.models import User


class RelationsServiceTests(TestCase):
    relations_service = RelationsService()

    def setUp(self):
        self.user1 = User.objects.create_user(username="testuser1", password="testpass")
        self.user2 = User.objects.create_user(username="testuser2", password="testpass")

    def tearDown(self):
        self.user1.user_subscriptions.clear()
        self.user1.delete()
        self.user2.delete()

    def test_get_friend(self):
        """Should get user1's friends."""
        self.assertQuerysetEqual(self.relations_service.get_friends(self.user1), [])
        # add user in friend
        self.relations_service.add_friend(self.user1, self.user2)
        self.assertQuerysetEqual(
            self.relations_service.get_friends(self.user1), [self.user2]
        )

    def test_add_friend(self):
        """Should add user2 in user1's friends."""
        self.relations_service.add_friend(self.user1, self.user2)
        self.assertIn(self.user2, self.user1.friends.all())

    def test_remove_friend(self):
        """Should romve user2 from user1's friends."""
        # add user in friend
        self.relations_service.add_friend(self.user1, self.user2)
        # remove user from friend
        self.relations_service.remove_friend(self.user1, self.user2)
        self.assertNotIn(self.user2, self.user1.friends.all())

    def test_add_subscibe(self):
        """Should add user2 in user1's subscription."""
        self.relations_service.add_subscibe(self.user1, self.user2)
        self.assertGreater(len(self.user1.user_subscriptions.all()), 0)

    def test_remove_subscibe(self):
        """Should romve user2 in user1's subscription."""
        # add user in subscription
        self.relations_service.add_subscibe(self.user1, self.user2)
        # remove user from subscription
        self.relations_service.remove_subscribe(self.user1, self.user2)
        self.assertEqual(len(self.user1.user_subscriptions.all()), 0)

    def test_get_subscription(self):
        """Should get user1's subscriptions."""
        self.assertQuerysetEqual(
            self.relations_service.get_friends(self.user1),
            self.user1.user_subscriptions.all(),
        )

    def test_unfriend_friend(self):
        """Should romve user2 from user1's friends. And add user1 in user2's subscribe."""
        # add user in friend
        self.relations_service.add_friend(self.user1, self.user2)
        # remove user from friend
        self.relations_service.unfriend(self.user1, self.user2)
        self.assertNotIn(self.user2, self.user1.friends.all())
        self.assertGreater(len(self.user2.user_subscriptions.all()), 0)

    def test_get_subscription(self):
        """Should get user1's subscribers."""
        self.assertEqual(len(self.relations_service.get_subscribers(self.user1)), 0)
        self.relations_service.add_subscibe(self.user2, self.user1)
        self.assertEqual(len(self.relations_service.get_subscribers(self.user1)), 1)

    def test_get_relation_type(self):
        """Should get user1's relation status."""
        # stranger status
        self.assertEqual(
            self.relations_service.get_relation_type(self.user1, self.user2),
            RelationStatus.STRANGER,
        )

        # friend status
        self.relations_service.add_friend(self.user1, self.user2)
        self.assertEqual(
            self.relations_service.get_relation_type(self.user1, self.user2),
            RelationStatus.FRIEND,
        )

        # subscriber status
        self.relations_service.unfriend(self.user1, self.user2)
        self.assertEqual(
            self.relations_service.get_relation_type(self.user1, self.user2),
            RelationStatus.SUBSCRIBER,
        )

        # subscribed status
        self.relations_service.remove_subscribe(self.user2, self.user1)
        self.relations_service.add_subscibe(self.user1, self.user2)
        self.assertEqual(
            self.relations_service.get_relation_type(self.user1, self.user2),
            RelationStatus.SUBSCRIBED,
        )
