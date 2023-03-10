from django.shortcuts import get_object_or_404

from .models import Publication, User, Voice, VoiceTypeChoices


class SetVoiceMixin:
    def set_voice(self, request, slug):
        publication = get_object_or_404(Publication, slug=slug)
        user = User.objects.get(pk=request.user.pk)
        voices = Voice.objects.filter(
            user=user,
            publication=publication
        )
        for voice in voices:
            if voice.type == self.voice_type:
                voice.delete()
                return None

        if self.voice_type != VoiceTypeChoices.BOOKMARK:
            for voice in voices:
                if voice.type == VoiceTypeChoices.UP or voice.type == VoiceTypeChoices.DOWN:
                    voice.delete()
            Voice.objects.create(publication=publication, user=user, type=self.voice_type)
        else:
            Voice.objects.create(publication=publication, user=user, type=self.voice_type)


    def get_voice_count(self, slug):
        publication = get_object_or_404(Publication, slug=slug)
        up_voice_count = Voice.objects.filter(
            publication=publication,
            type=VoiceTypeChoices.UP
        ).count()
        down_voice_count = Voice.objects.filter(
            publication=publication,
            type=VoiceTypeChoices.DOWN
        ).count()
        bookmark_count = Voice.objects.filter(
            publication=publication,
            type=VoiceTypeChoices.BOOKMARK
        ).count()
        return {
            'up_voice_count': up_voice_count,
            'down_voice_count': down_voice_count,
            'bookmark_count': bookmark_count,
        }
