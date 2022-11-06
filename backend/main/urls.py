from . import views
from django.urls import path

urlpatterns = [
    path('user/publication/<int:user_id>', views.UserPublicationList.as_view()),
]
