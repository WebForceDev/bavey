from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/auth_api/', include("auth_api.urls")),
    path('api/v1.0/blog_api/', include("blog_api.urls")),
    path('api/v1.0/relations_api/', include("relations_api.urls")),
    path('api/v1.0/search_api/', include("search_api.urls")),
    path('api/v1.0/messenger_api/', include("messenger_api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)