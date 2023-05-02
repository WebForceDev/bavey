from django.db import models

from blog_api.models import User


class FriendRequest(models.Model):
    sender = models.ForeignKey(
        User,
        help_text="User who send friend request",
        on_delete=models.CASCADE,
        related_name="sender",
    )
    recipient = models.ForeignKey(
        User,
        help_text="User who receives friend request",
        on_delete=models.CASCADE,
        related_name="recipient",
    )
    # Message from sender user
    message = models.TextField()

    class Meta:
        verbose_name = "FriendRequest"
        verbose_name_plural = "FriendRequests"

    def __str__(self) -> str:
        return f"{self.sender} -> {self.recipient}"
