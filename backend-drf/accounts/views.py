from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

# Create your views here.
# def register(request):
#     return JsonResponse({'message': 'Register endpoint'})

class RegisterView(generics.ListCreateAPIView):
    # Define your serializer and queryset here
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view
