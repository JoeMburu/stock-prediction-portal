from wsgiref import validate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True, min_length=3, max_length=150,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, 
        min_length=8, max_length=128, trim_whitespace=False,
        style={'input_type': 'password'}
    )
    confirmPassword = serializers.CharField(
        write_only=True, required=False, 
        min_length=8, max_length=128, trim_whitespace=False,
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        write_only=True, required=False, 
        min_length=8, max_length=128, trim_whitespace=False,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirmPassword', 'confirm_password']    
        read_only_fields = ['password']   

    def validate(self, attrs):
        pwd = attrs.get('password')
        cpwd = (
            attrs.get("confirmPassword")
            or attrs.get("confirm_password")
            or self.initial_data.get("confirmPassword")
            or self.initial_data.get("confirm_password")
        )

        if cpwd is None:
            raise serializers.ValidationError({"confirmPassword": "This field is required."})
        if pwd != cpwd:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match."})

        
        user = User(username=attrs.get('username'), email=attrs.get('email'))
        validate_password(pwd, user=user)    
        return attrs      

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        validated_data.pop('confirm_password', None)
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data) 
        return user
    
    
  