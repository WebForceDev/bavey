import logging

from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware


logger = logging.getLogger()

@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        if b'Token' in headers:
            try:
                token_name, token_key = headers[b'Token'].decode().split()
                if token_name == 'Token':
                    token = Token.objects.get(key=token_key)
                    scope['user'] = token.user
            except Token.DoesNotExist:
                scope['user'] = AnonymousUser()
        return self.inner(scope)
