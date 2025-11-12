from rest_framework import serializers
from .models import Emergency
from user.serializers import UserSerializer

class EmergencySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Emergency
        fields = ['id', 'user', 'location', 'description', 'status', 'created_at', 'updated_at']
        read_only_fields = ['status', 'created_at', 'updated_at'] 