from django.contrib import admin

from . import models


admin.site.register(models.Publication)
admin.site.register(models.Community)
admin.site.register(models.User)
