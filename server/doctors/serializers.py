from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'id',
            'name',
            'specialty',
            'hospital',
            'rating',
            'image',
            'description',
            'experience',
            'education',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at'] 