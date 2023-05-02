from django.urls import path

from . import views


urlpatterns = [
    # Publication api
    path('publications/saved', views.SavedPublication.as_view()),
    path('publications/<slug:slug>', views.PublicationsApiView.as_view()),
    path('publications/<slug:publication_slug>/voices', views.VoicesApiView.as_view()),
    # User api    
    path('user/<str:username>', views.UserApiView.as_view()),
    path('user/<str:username>/publications', views.UserPublicationApiView.as_view()),
    path('user/<str:username>/statistic', views.UserStatisticApiView.as_view()),
    # Community api
    path('community/', views.CreateCommunityApiView.as_view()),
    path('community/<str:title>', views.CommunityApiView.as_view()),
    path('community/<str:title>/publications', views.CommunityPublicationApiView.as_view()),
    path('community/<str:title>/statistic', views.CommunityStatisticApiView.as_view()),
    path('community/<str:title>/subscribers', views.CommunitySubscribersApiView.as_view()),
]
