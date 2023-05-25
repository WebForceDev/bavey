from django.test import TestCase

from blog_api.services.community import CommunityService
from blog_api.models import User, Publication, WallTypeChoices, Community


class CommunityServiceTests(TestCase):
    service = CommunityService()
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.community = Community.objects.create(
            title='community',
            owner=self.user
        )
        self.publication = Publication.objects.create(
            title="test publicaton",
            owner=self.user,
            wall_type=WallTypeChoices.COMMUNITY,
            wall_community=self.community,
        )

    def tearDown(self):
        self.publication.delete()
        self.user.delete()

    def test_community_by_title(self):
        """Should get community by title."""
        community = self.service.get_community_by_title(self.community.title)
        self.assertEqual(community.pk, self.community.pk)

    def test_publication_from_community_wall(self):
        """Should get publication from community wall."""
        publications_from_wall = self.service.get_community_publications(self.community)
        self.assertIn(self.publication, publications_from_wall)

    def test_create_publication_on_user_wall(self):
        """Should create publication on community wall."""
        new_publication = self.service.create_publication_on_community_wall('title', self.user, self.community)
        publications_from_wall = self.service.get_community_publications(self.community)
        self.assertIn(new_publication, publications_from_wall)
