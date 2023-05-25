from django.urls import path

from . import views


urlpatterns = [
    path('login', views.AuthToken.as_view()),
]
