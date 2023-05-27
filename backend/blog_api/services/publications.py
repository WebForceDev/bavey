from django.shortcuts import get_object_or_404

from blog_api.models import Publication, User, PublicationMedia
from blog_api.serializers import PublicationSerializer, UserSerializer, PublicationMediaSerializer


class PublicationService:
    def get_publication_by_slug(self, slug: str) -> Publication:
        """
        This method get publication by slug.

        :param slug: publication's slug.
        :return: publication by slug.
        """
        publication = get_object_or_404(Publication, slug=slug)
        return publication

    def delete_publication_by_slug(self, slug: str) -> None:
        """
        This method delete publication by slug.

        :param slug: publication's slug.
        """
        publication = self.get_publication_by_slug(slug)
        publication.delete()

    def update_publication(self):
        pass

    def get_serialized_publicaitons_with_voices(self, publications: list) -> list:
        """
        This method get publication list publications with voices

        :param page: pagination page
        """
        data = []
        if publications is not None:
            for publication in publications:
                voices_up = publication.voices_up.all()
                voices_down = publication.voices_down.all()
                publication_media = PublicationMedia.objects.filter(publication=publication)
                data.append(
                    {
                        "publication": PublicationSerializer(publication).data,
                        "owner": UserSerializer(publication.owner).data,
                        "voices_up": UserSerializer(voices_up, many=True).data,
                        "voices_down": UserSerializer(voices_down, many=True).data,
                        "publication_media": PublicationMediaSerializer(publication_media, many=True).data
                    }
                )
        return data
