from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
def login_view(request):
    return JsonResponse({'message': 'Login endpoint'})