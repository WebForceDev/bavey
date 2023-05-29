import logging

from .models import Chat, ChatMessage
from rest_framework.authtoken.models import Token


logger = logging.getLogger()

class ChatService:
    def get_or_create_chat(self, slug):
        chat = Chat.objects.get_or_create(slug=slug)
        return chat[0]

    def get_chat_messages(self, slug):
        chat = self.get_or_create_chat(slug)
        messages = ChatMessage.objects.filter(chat=chat)
        return messages.order_by('-created_at')

    def get_users_chats(self, user):
        return user.users_in_chat.all()

    def get_user_from_token(self, token):
        obj = Token.objects.get(key=token)
        return obj.user

    def add_user_in_chat(self, chat_slug, token):
        user = self.get_user_from_token(token)
        chat = self.get_or_create_chat(chat_slug)
        chat.users_in_chat.add(user)

    def create_messages(self, slug, message, token):
        chat = self.get_or_create_chat(slug)
        user = self.get_user_from_token(token)
        ChatMessage.objects.create(chat=chat, message=message, user=user)

