from django.urls import path

from . import views


urlpatterns = [
    path('chats/<str:room_name>', views.chat_room),
    path('chats', views.ChatAPI.as_view()),
]
