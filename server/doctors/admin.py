from django.contrib import admin
from .models import Doctor

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'specialty', 'hospital', 'rating', 'experience')
    list_filter = ('specialty', 'hospital', 'rating')
    search_fields = ('name', 'specialty', 'hospital', 'description')
    ordering = ('-rating', '-created_at')
