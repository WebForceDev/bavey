from django.test import TestCase

from blog_api.services.publications import PublicationService
from blog_api.models import User, Publication, WallTypeChoices


class VoicesServiceTests(TestCase):
    service = PublicationService()
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

    def test_publication_by_slug(self):
        """Should get publication by slug."""
        publication = self.service.get_publication_by_slug(self.publication.slug)
        self.assertEqual(publication.pk, self.publication.pk)

    def test_delete_publication_by_slug(self):
        """Should delete publication by slug."""
        self.service.delete_publication_by_slug(self.publication.slug)
        self.assertNotIn(self.publication, Publication.objects.all())
