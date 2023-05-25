from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/auth_api/', include("auth_api.urls")),
    path('api/v1.0/blog_api/', include("blog_api.urls")),
    path('api/v1.0/relations_api/', include("relations_api.urls")),
]
