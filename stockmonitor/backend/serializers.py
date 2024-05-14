from rest_framework import serializers
from .models import WishList
from django.db import models

class WishlistSerializer(serializers.ModelSerializer):    
    class Meta:
        model = WishList
        fields = ["symbol","latest_value","change"]