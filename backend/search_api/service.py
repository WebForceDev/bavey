from elasticsearch_dsl import Q

from .document import CommunityDocument, UserDocument, PublicationDocument


def search_user(search_query):
    query_user = Q("match", username={"query": search_query, "fuzziness": "AUTO"}) | \
                 Q("match", first_name={"query": search_query, "fuzziness": "AUTO"}) | \
                 Q("match", last_name={"query": search_query, "fuzziness": "AUTO"}) | \
                 Q("match", description={"query": search_query, "fuzziness": "AUTO"})

    search = UserDocument.search().query(query_user)
    queryset = search.to_queryset()

    return queryset

def search_community(search_query):
    query_community = Q("match", title={"query": search_query, "fuzziness": "AUTO"}) | \
                      Q("match", description={"query": search_query, "fuzziness": "AUTO"})

    search = CommunityDocument.search().query(query_community)
    queryset = search.to_queryset()

    return queryset

def search_publication(search_query):
    query_publication = Q("match", username={"title": search_query, "fuzziness": "AUTO"})

    search = PublicationDocument.search().query(query_publication)
    queryset = search.to_queryset()

    return queryset
