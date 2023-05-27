from rest_framework.decorators import api_view
from rest_framework.response import Response

from .service import search_community, search_publication, search_user
from blog_api.serializers import UserSerializer, CommunitySerializer, PublicationSerializer


@api_view()
def quert(request):
    search_query = request.query_params.get('search', None)
    fillter = request.query_params.get('fillter', None)
    query = []

    if search_query and fillter == 'user':
        query = search_user(search_query)
        return Response(UserSerializer(query, many=True).data, status=200)
    if search_query and fillter == 'community':
        query = search_community(search_query)
        return Response(CommunitySerializer(query, many=True).data, status=200)
    if search_query and fillter == 'publication':
        query = search_publication(search_query)
        return Response(PublicationSerializer(query, many=True).data, status=200)
    
    return Response([], status=200)
