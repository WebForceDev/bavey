from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from blog_api.services.user_blog import UserBlogService
from .serializers import ChatMessageSerializer, ChatSerializer
from .service import ChatService
from .models import Chat


@api_view()
def chat_room(request, room_name):
    service = ChatService()
    messages = service.get_chat_messages(room_name)
    return Response(ChatMessageSerializer(messages, many=True).data, status=200)


class ChatAPI(APIView):
    service = ChatService()

    def get(self, request):
        service = ChatService()
        chats = service.get_users_chats(request.user)
        return Response(ChatSerializer(chats, many=True).data, status=200)

    def post(self, request):
        chat = Chat()
        chat.save()
        chat.users_in_chat.add(request.user)
        user_service = UserBlogService()
        user = user_service.get_user_by_username(request.body['username'])
        chat.users_in_chat.add(user)
        return Response(ChatSerializer(chat).data, status=200)
