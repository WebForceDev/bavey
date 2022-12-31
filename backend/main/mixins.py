from django.shortcuts import get_object_or_404

from .models import Publication, User, Voice


class SetVoiceMixin:
    def set_voice(self, request, slug):
        publication = get_object_or_404(Publication, slug=slug)
        user = User.objects.get(pk=request.user.pk)
        voice = Voice.objects.filter(
            user=user,
            publication=publication
        )
        if voice:
            voice.first().delete()
        else:
            Voice.objects.create(
                user=user,
                publication=publication,
                type=self.voice_type
            )

    def get_voice_count(self, slug):
        publication = get_object_or_404(Publication, slug=slug)
        return Voice.objects.filter(
            publication=publication,
            type=self.voice_type
        ).count()
