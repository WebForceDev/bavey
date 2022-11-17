from django.shortcuts import get_object_or_404

from .models import Publication, User, Voice


class SetVoiceMixin:
    def set_voice(self, request, pk):
        publication = get_object_or_404(Publication, pk=pk)
        user = User.objects.get(pk=request.user.pk)
        voice = Voice.objects.filter(
            user=user,
            publication=publication,
            type=self.voice_type
        )
        if voice:
            voice.first().delete()
        else:
            Voice.objects.create(
                user=user,
                publication=publication,
                type=self.voice_type
            )

    def get_voice_count(self, pk):
        publication = get_object_or_404(Publication, pk=pk)
        return Voice.objects.filter(
            publication=publication,
            type=self.voice_type
        ).count()
