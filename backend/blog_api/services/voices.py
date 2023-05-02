from django.db.models import QuerySet

from blog_api.models import Publication, User
from blog_api.voice_type import VoiceType


class VoicesService:
    def remove_voice(
        self, user_voices_set: QuerySet[Publication], publication: Publication
    ) -> None:
        """
        This method remove voice from user voice set

        :param user_voices_set: user's voices.
        :param publication: publication remove from user's voices.
        """
        if publication in user_voices_set.all():
            user_voices_set.remove(publication)

    def toggle_voice(
        self, user_voices_set: QuerySet[Publication], publication: Publication
    ) -> None:
        """
        This method add publication in user's voices if the voice does not exist
        Or remove publication from user's voices if the voice exist

        :param user_voices_set: user's voices.
        :param publication: publication remove from user's voices.
        """
        if publication in user_voices_set.all():
            user_voices_set.remove(publication)
        else:
            user_voices_set.add(publication)

    def add_voice(
        self, voice_type: VoiceType, user: User, publication: Publication
    ) -> None:
        """
        This method add publication in user's voices

        :param voice_type: what type of voice to add.
        :param user: wich user's voices.
        :param publication: publication add in user's voices.
        """
        if voice_type == VoiceType.VOICES_UP.value:
            self.set_upvoice(voice_type, user, publication)
        if voice_type == VoiceType.VOICES_DOWN.value:
            self.set_downvoice(voice_type, user, publication)
        if voice_type == VoiceType.BOOKMARK.value:
            self.set_bookmark(voice_type, user, publication)

    def set_upvoice(
        self, voice_type: VoiceType, user: User, publication: Publication
    ) -> None:
        """
        This method add publication in user's up voices if the voice does not exist
        Or remove publication from user's up voices if the voice exist
        And remove publication from user's down voices

        :param voice_type: what type of voice to add.
        :param user: wich user's voices.
        :param publication: publication add in user's voices.
        """
        self.remove_voice(getattr(user, VoiceType.VOICES_DOWN.value), publication)
        self.toggle_voice(getattr(user, voice_type), publication)

    def set_downvoice(
        self, voice_type: VoiceType, user: User, publication: Publication
    ) -> None:
        """
        This method add publication in user's down voices if the voice does not exist
        Or remove publication from user's down voices if the voice exist
        And remove publication from user's up voices

        :param voice_type: what type of voice to add.
        :param user: wich user's voices.
        :param publication: publication add in user's voices.
        """
        self.remove_voice(getattr(user, VoiceType.VOICES_UP.value), publication)
        self.toggle_voice(getattr(user, voice_type), publication)

    def set_bookmark(
        self, voice_type: VoiceType, user: User, publication: Publication
    ) -> None:
        """
        This method add publication in user's bookmark if publication not in user's bookmark
        Or remove publication from user's bookmark uf publication in user's bookmark

        :param voice_type: what type of voice to add.
        :param user: wich user's voices.
        :param publication: publication add in user's voices.
        """
        self.toggle_voice(getattr(user, voice_type), publication)

    def delete_voice(
        self, user: User, voice_type: VoiceType, publicaton: Publication
    ) -> None:
        self.remove_voice(getattr(user, voice_type), publicaton)
