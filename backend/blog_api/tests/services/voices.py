from django.test import TestCase

from blog_api.services.voices import VoicesService
from blog_api.models import User, Publication, WallTypeChoices
from blog_api.voice_type import VoiceType


class VoicesServiceTests(TestCase):
    service = VoicesService()

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.publication = Publication.objects.create(
            title="test publicaton",
            owner=self.user,
            wall_type=WallTypeChoices.USER,
            wall_user=self.user,
        )

    def tearDown(self):
        self.user.delete()
        self.publication.delete()

    def test_remove_voice(self):
        """Should remove publication from user voices."""
        self.user.voices_up.add(self.publication)
        self.service.remove_voice(self.user.voices_up, self.publication)
        self.assertNotIn(self.publication, self.user.voices_up.all())

    def test_toggle_voice(self):
        """
        Should add publication in user's voices if the voice does not exist
        Or remove publication from user's voices if the voice exist.
        """
        self.service.toggle_voice(self.user.voices_up, self.publication)
        self.assertIn(self.publication, self.user.voices_up.all())
        self.service.toggle_voice(self.user.voices_up, self.publication)
        self.assertNotIn(self.publication, self.user.voices_up.all())

    def test_add_up_voice(self):
        """Should add publication in user up voices."""
        #  test add up voice
        self.service.add_voice(VoiceType.VOICES_UP, self.user, self.publication)
        self.assertIn(self.publication, self.user.voices_up.all())
        #  test toggle up voice
        self.service.add_voice(VoiceType.VOICES_UP, self.user, self.publication)
        self.assertNotIn(self.publication, self.user.voices_up.all())
        # test remove down voice when add up voice
        self.user.voices_down.add(self.publication)
        self.service.add_voice(VoiceType.VOICES_UP, self.user, self.publication)
        self.assertIn(self.publication, self.user.voices_up.all())
        self.assertNotIn(self.publication, self.user.voices_down.all())

    def test_add_down_voice(self):
        """Should add publication in user down voices."""
        #  test add down voice
        self.service.add_voice(VoiceType.VOICES_DOWN, self.user, self.publication)
        self.assertIn(self.publication, self.user.voices_down.all())
        #  test toggle down voice
        self.service.add_voice(VoiceType.VOICES_DOWN, self.user, self.publication)
        self.assertNotIn(self.publication, self.user.voices_down.all())
        # test remove down voice when add up voice
        self.user.voices_up.add(self.publication)
        self.service.add_voice(VoiceType.VOICES_DOWN, self.user, self.publication)
        self.assertIn(self.publication, self.user.voices_down.all())
        self.assertNotIn(self.publication, self.user.voices_up.all())

    def test_add_bookmark(self):
        """Should add publication in user down voices."""
        #  test add down voice
        self.service.add_voice(VoiceType.BOOKMARK, self.user, self.publication)
        self.assertIn(self.publication, self.user.bookmarks.all())
        #  test toggle down voice
        self.service.add_voice(VoiceType.BOOKMARK, self.user, self.publication)
        self.assertNotIn(self.publication, self.user.bookmarks.all())
