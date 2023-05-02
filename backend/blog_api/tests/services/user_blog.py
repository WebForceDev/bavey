from django.test import TestCase

from blog_api.services.user_blog import UserBlogService
from blog_api.models import User, Publication, WallTypeChoices


class VoicesServiceTests(TestCase):
    service = UserBlogService()
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.publication = Publication.objects.create(
            title="test publicaton",
            owner=self.user,
            wall_type=WallTypeChoices.USER,
            wall_user=self.user,
        )

    def tearDown(self):
        self.publication.delete()
        self.user.delete()

    def test_publication_by_username(self):
        """Should get user by usernaem."""
        user = self.service.get_user_by_username(self.user.username)
        self.assertEqual(user.pk, self.user.pk)

    def test_publication_from_user_wall(self):
        """Should get publication from user wall."""
        publications_from_wall = self.service.get_publication_from_user_wall(self.user)
        self.assertIn(self.publication, publications_from_wall)

    def test_create_publication_on_user_wall(self):
        """Should create publication on user wall."""
        new_publication = self.service.create_publication_on_user_wall('title', self.user, self.user)
        publications_from_wall = self.service.get_publication_from_user_wall(self.user)
        self.assertIn(new_publication, publications_from_wall)
