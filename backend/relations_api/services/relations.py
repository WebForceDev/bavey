from django.shortcuts import get_object_or_404
from django.db.models import QuerySet

from blog_api.models import User, Subscription
from blog_api.serializers import UserSerializer
from relations_api.relation_status import RelationStatus


class RelationsService:
    """This is a class for managing user relationships."""

    def get_friends(self, user: User) -> QuerySet[User]:
        """
        This method does get user's friends.

        :param user: The user of whose friends we are get.
        :return: User's friends QuerySet.
        """
        return user.friends.all()

    def add_friend(self, master_user: User, slave_user: User) -> None:
        """
        This method does add slave_user in master_user's friends.

        :param master_user: The user which append new friend.
        :param slave_user: The user we add in friends.
        """
        master_user.friends.add(slave_user)
        master_user.save()

    def remove_friend(self, master_user: User, slave_user: User) -> None:
        """
        This method does remove slave_user from master_user's friends.

        :param master_user: User whose friend removed.
        :param slave_user: The user we remove from friends.
        """
        master_user.friends.remove(slave_user)
        master_user.save()
        self.add_subscibe(slave_user, master_user)

    def add_subscibe(self, master_user: User, slave_user: User) -> None:
        """
        This method does add slave_user in master_user's subscription.

        :param master_user: The user which append new subscription.
        :param slave_user: The user we add in subscription.
        """
        subscriber = Subscription.objects.create(subscription_user=slave_user)
        master_user.user_subscriptions.add(subscriber)
        

    def remove_subscribe(self, master_user: User, slave_user: User) -> None:
        """
        This method does remoe slave_user from master_user's subscription.

        :param master_user: User whose subscription removed.
        :param slave_user: The user we remove from subscription.
        """
        subscriber = get_object_or_404(
            master_user.user_subscriptions, subscription_user=slave_user
        )
        master_user.user_subscriptions.remove(subscriber)
        subscriber.delete()

    def get_subsctibers(self, user: User) -> QuerySet[Subscription]:
        """
        This method does get user's subscription.

        :param user: The user of whose subscriptions we are get.
        :return: User's subscriptions QuerySet.
        """
        return user.user_subscriptions.all()

    def unfriend(self, master_user: User, slave_user: User) -> None:
        """
        This method does remove slave_user from master_user friends
        and add master_user in slave_user's subscription.

        :param master_user: User whose friend removed.
        :param slave_user: The user which append new subscription.
        """
        self.remove_friend(master_user, slave_user)
        self.add_subscibe(slave_user, master_user)

    def get_subscribers(self, user: User) -> QuerySet[Subscription]:
        """
        This method does get user's subscribers.

        :param user: The user of whose subscribers we are get.
        :return: User's subscribers QuerySet.
        """
        return Subscription.objects.filter(subscription_user=user)
    
    def get_subscriptions(self, user:User):
        return user.user_subscriptions.all()

    def get_user_relations_serialized(self, user):
        friends = self.get_friends(user)
        subscribers = self.get_subsctibers(user)
        subscriptions = self.get_subscriptions(user)

        subscribers_serializer = UserSerializer(subscribers, many=True)
        friends_serializer = UserSerializer(friends, many=True)
        subscriptions_serializer = UserSerializer(subscriptions, many=True)

        return {
            "subscribers": subscribers_serializer.data,
            "friends": friends_serializer.data,
            "subscriptions": subscriptions_serializer.data,
        }

    def get_relation_type(self, master_user: User, slave_user: User) -> RelationStatus:
        """
        This method does get status of user's relation.

        :param master_user: The user of whose status we are get.
        :param slave_user: The user's relation status we receive.
        :return: relation status enum.
        """
        relation_type = RelationStatus.STRANGER

        if master_user in slave_user.friends.all():
            relation_type = RelationStatus.FRIEND
        if master_user.user_subscriptions.filter(subscription_user=slave_user).exists():
            relation_type = RelationStatus.SUBSCRIBED
        if slave_user.user_subscriptions.filter(subscription_user=master_user).exists():
            relation_type = RelationStatus.SUBSCRIBER

        return relation_type
