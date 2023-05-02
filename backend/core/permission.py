from rest_framework import permissions

    
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        else:
            return obj.owner.username == request.user.username
        
class IsProfileOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        else:
            return obj.username == request.user.username

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True
        else:
            return request.user in obj.admins.all()
