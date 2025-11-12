from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Emergency
from .serializers import EmergencySerializer

class EmergencyViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return only emergencies for the current user
        return Emergency.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        # Only allow status updates
        if 'status' in request.data:
            instance.status = request.data['status']
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response(
            {"error": "Only status updates are allowed"},
            status=status.HTTP_400_BAD_REQUEST
        ) 