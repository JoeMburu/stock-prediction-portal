from django.contrib import admin
from django.urls import include, path
from . import views
from accounts.views import RegisterView, ProtectedView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  path('register/', RegisterView.as_view(), name='register'),

  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('protected-view/', ProtectedView.as_view(), name='protected_view'),

  # Prediction API
  path('predict/', views.StockPredictionAPIView.as_view(), name='stock_prediction'),

] 
