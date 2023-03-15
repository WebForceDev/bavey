from django.urls import path

from . import views
from .models import VoiceTypeChoices


urlpatterns = [
    path('user/<slug:slug>', views.UserRetrieve.as_view()),

    path('friendrequest/create/<slug:slug>', views.FriendRequestCreate.as_view()),
    path('friendrequest/accept/<slug:slug>', views.FriendRequestAccept.as_view()),
    path('friendrequest/reject/<slug:slug>', views.FriendRequestReject.as_view()),

    path('relations', views.UserRelationships.as_view()),
    path('relations/type/<slug:slug>', views.RelationType.as_view()),
    path('relations/deletefriend/<slug:slug>', views.RelationDeleteFriend.as_view()),
    path('relations/unsubscribe/<slug:slug>', views.RelationUnsubscribe.as_view()),

    path('community/<slug:slug>', views.CommunityRetrieve.as_view()),
    path('community/<slug:slug>/statistic', views.CommunityStatistic.as_view()),

    path('profile/friendrequest', views.UserFriendRequests.as_view()),
    path('profile', views.Profile.as_view()),

    path('publication/createPublication', views.CreatePublication.as_view()),
    path('publication/saved/<str:saved_type>', views.SavedPublication.as_view()),
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
