from django.urls import path

from . import views


urlpatterns = [
    path('query', views.quert),
]
