from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from blog_api.models import User, Community, Publication


@registry.register_document
class UserDocument(Document):
    class Index:
        name = 'user'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = User

        fields = [
            'username',
            'first_name',
            'last_name',
            'description'
        ]


@registry.register_document
class CommunityDocument(Document):
    class Index:
        name = 'community'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Community

        fields = [
            'title',
            'description'
        ]


@registry.register_document
class PublicationDocument(Document):
    class Index:
        name = 'publication'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Publication

        fields = [
            'title'
        ]