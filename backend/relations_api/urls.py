from django.urls import path

from . import views


urlpatterns = [
    # Friend requests
    path("friend_requests", views.FriendRequestListCreate.as_view()),
    path("friend_requests/<int:pk>", views.FriendRequestAPIView.as_view()),
    path("friend_requests/<int:pk>/accept", views.FriendRequestAccept.as_view()),
    path("friend_requests/<int:pk>/reject", views.FriendRequestReject.as_view()),
    # Relations
    path("relations", views.RelationsList.as_view()),
    path("relations/<str:username>/", views.RelationshipView.as_view()),
    path("relations/<str:username>/removefriend", views.RelationRemoveFriend.as_view()),
    path("relations/<str:username>/unsubscribe", views.RelationUnsubscribe.as_view()),
]
