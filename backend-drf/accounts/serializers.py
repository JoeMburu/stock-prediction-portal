from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True, min_length=3, max_length=150)
    password = serializers.CharField(write_only=True, required=True, min_length=8, max_length=128, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password']    
        read_only_fields = ['password',]      

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email']            
        )
        user.set_password(validated_data['password'])
        user.save()
        return user