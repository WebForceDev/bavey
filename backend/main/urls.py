from django.urls import path

from . import views


urlpatterns = [
    path('user/<int:user_id>/publications/', views.UserPublicationList.as_view()),
    path('user/<int:pk>', views.UserRetrieve.as_view()),
    path('profile/<int:pk>', views.Profile.as_view()),
    path('publication/<int:pk>', views.PublicationRetrieve.as_view()),
]
