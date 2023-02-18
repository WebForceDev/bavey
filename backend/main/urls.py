from django.urls import path

from . import views
from .models import VoiceTypeChoices


urlpatterns = [
    path('user/<slug:slug>/friends', views.UserFriends.as_view()),
    path('user/<slug:slug>', views.UserRetrieve.as_view()),
    path('profile', views.Profile.as_view()),
    path('publication/createPublication', views.CreatePublication.as_view()),
    path('publication/<slug:slug>', views.PublicationRetrieve.as_view()),
    path(
        'publication/<slug:slug>/setupvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.UP)),
    path(
        'publication/<slug:slug>/setdownvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.DOWN)),
    path(
        'publication/<slug:slug>/setbookmarkvoice',
        views.PublicationSetVoice.as_view(voice_type=VoiceTypeChoices.BOOKMARK)),
]
