from django.db import models
from user.models import UserAccount

class Emergency(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('resolved', 'Resolved'),
        ('cancelled', 'Cancelled')
    ]

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='emergencies')
    location = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Emergency for {self.user.name} at {self.created_at}"

    class Meta:
        ordering = ['-created_at'] 