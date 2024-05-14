from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth import authenticate , login , logout

from .serializers import WishlistSerializer
from .models import WishList

from .data import get_stock_data
# Create your views here.

class ListCreateWishlist(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer
    
    def get_queryset(self):
        #edited the queryset function to extract latest stock information
        #implemented the functionality to extract data from the stock API in get_stock_data function defined in data.py
        #and extracting information about every stock in a user's wishlist ( only if user is signed in )
        if(self.request.user.is_authenticated):
            myset = WishList.objects.filter(user=self.request.user)
            for obj in myset:
                data = get_stock_data(obj.symbol)
                obj.latest_value = data['latest_value']
                obj.change = data['change']
                print(obj)
                obj.save()
            return myset
        else:
            print("No")
            return None
        
class RetrieveUpdateWishList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WishlistSerializer
    def get_queryset(self):
        #edited the queryset function to extract latest stock information
        #implemented the functionality to extract data from the stock API in get_stock_data function defined in data.py
        #and extracting information about every stock in a user's wishlist ( only if user is signed in )

        if(self.request.user.is_authenticated):
            myset = WishList.objects.filter(user=self.request.user)
            for obj in myset:
                print("symbol = ",obj.symbol)
                data = get_stock_data(obj.symbol)
                obj.latest_value = data['latest_value']
                obj.change = data['change']
                print(obj)
                obj.save()
            return myset
        else:
            print("No")
            return None
