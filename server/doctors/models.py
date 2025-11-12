from django.db import models

# Create your models here.

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    hospital = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    image = models.ImageField(upload_to='doctors/', null=True, blank=True)
    description = models.TextField()
    experience = models.IntegerField(default=0)
    education = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dr. {self.name} - {self.specialty}"

    class Meta:
        ordering = ['-rating', '-created_at']
