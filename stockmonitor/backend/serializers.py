from rest_framework import serializers
from .models import WishList
from django.contrib.auth.models import User 
from django.db import models
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .data import get_stock_data

class WishlistSerializer(serializers.ModelSerializer):    

    def create(self, validate_data):
        response = get_stock_data(validate_data.get("symbol"))
        validate_data['latest_value'] = response.get("latest_value")
        validate_data['change'] = response.get("change")
        return super().create(validate_data)

    class Meta:
        model = WishList
        fields = ["symbol","latest_value","change","user"]



class ShowWishlistSerializer(serializers.ModelSerializer):    
    class Meta:
        model = WishList
        fields = ["symbol","latest_value","change"]

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True,required=True,validators=[validate_password])
    password2 = serializers.CharField(write_only=True,required=True)
    class Meta:
        model = User
        fields = ["email","username","password","password2","first_name","last_name"]
        extra_kwargs = {'first_name':{'required':True},'email':{'required':True}}

    def validate(self,attrs):
        if attrs['password']!=attrs['password2'] :
            raise serializers.ValidationError({"password":"Passwords fields doesn't match!!!"})
        return attrs
    
    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        print(user)
        return user
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id','username','password']
        extra_kwargs = {'password' : { 'write_only' : True }}