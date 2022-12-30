from django.urls import path

from . import views
from .models import VoiceTypeChoices


urlpatterns = [
    path('user/<slug:slug>', views.UserRetrieve.as_view()),
    path('profile/<slug:slug>', views.Profile.as_view()),
    path('publication/<int:pk>', views.PublicationRetrieve.as_view()),
    path(
        'publication/<int:publication_pk>/setupvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.UP)),
    path(
        'publication/<int:publication_pk>/setdownvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.DOWN)),
    path(
        'publication/<int:publication_pk>/setbookmarkvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.BOOKMARK)),
]
