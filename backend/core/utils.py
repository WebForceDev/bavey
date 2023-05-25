from django.utils.crypto import get_random_string


def slug_save(obj) -> None:
    """
    This method add random slug in django model
    If the slug is not written

    :param obj: The object of django model with slug field.
    """
    #  If the slug is not written
    if not obj.slug:
        obj.slug = get_random_string(15)
        slug_is_wrong = True
        # Generate a slug until it becomes unique
        while slug_is_wrong:
            slug_is_wrong = False
            other_objs_with_slug = type(obj).objects.filter(slug=obj.slug)
            if len(other_objs_with_slug) > 0:
                slug_is_wrong = True
            if slug_is_wrong:
                obj.slug = get_random_string(5)
