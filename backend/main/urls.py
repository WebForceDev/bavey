from django.urls import path

from . import views


urlpatterns = [
    path('user/publications/<int:user_id>', views.UserPublicationList.as_view()),
    path('user/<int:pk>', views.UserRetrieve.as_view()),
]
