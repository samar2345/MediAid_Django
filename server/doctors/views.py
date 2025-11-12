from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Doctor
from .serializers import DoctorSerializer

# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Doctor.objects.all()
        specialty = self.request.query_params.get('specialty', None)
        rating = self.request.query_params.get('rating', None)
        search = self.request.query_params.get('search', None)

        if specialty:
            queryset = queryset.filter(specialty=specialty)
        if rating:
            queryset = queryset.filter(rating__gte=rating)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset
