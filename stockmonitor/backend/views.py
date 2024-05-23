from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from django.views.generic import View
from django.shortcuts import redirect
from rest_framework.response import Response
from django.contrib.auth import authenticate , login , logout

from .serializers import WishlistSerializer , RegisterSerializer , ShowWishlistSerializer
from .models import WishList

from .data import get_stock_data
# Create your views here.

class RegisterView(APIView):
    def post(self,request):
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            login(request,username = serializer.data['username'],password = serializer.data['password'])
            return Response({'status':'success'})
        else:
            return Response({'status':serializer.errors})
class LoginView(APIView):
    def post(self,request): 
        print(request.data)
        username = request.data['username']
        passwd = request.data['password']
        print(username , passwd)
        user = authenticate(request,username=username,password = passwd)
        if user is not None:
            login(request,user)
            print("Logged in")
            return Response({'status':'success'})
        else:
            return Response({'status':'failure'})




class ListCreateWishlist(APIView):
    def post(self,request):
        print("POSTED REQUEST")
        if request.user.is_authenticated :
            mydata = request.data.copy()
            mydata["user"] = request.user.id
            serializer = WishlistSerializer(data = mydata)
            print(request.data)
            if serializer.is_valid():
                if WishList.objects.filter(user = request.user,symbol=mydata["symbol"]):
                    return Response({"status":"failed","Message":"The stock already exists in your wishlist !!!!!"})
                serializer.save()
                return Response({"Message":"Stock created successfully"})
            else:
                print(serializer.errors)
                return Response({"status":"failed","Error" :serializer.errors})
        else:
            return Response({"status":"failed","Message":"You must be logged in to add stocks to your wishlist!!"})
        

    def get(self,request):
        '''function to extract latest stock information implemented the functionality to extract data from the stock API in get_stock_data function defined in data.py and extracting information about every stock in a user's wishlist ( only if user is signed in )'''
        if(request.user.is_authenticated):
            print(request.user)
            myset = WishList.objects.filter(user=request.user)
            for obj in myset:
                data = get_stock_data(obj.symbol)
                obj.latest_value = data['latest_value']
                obj.change = data['change']
                print(obj)
                obj.save()
            serializer = ShowWishlistSerializer(myset,many=True)
            return Response(serializer.data)
        else:
            print(request.user)
            return Response({"status":"failed","Error":"You must be logged in to view/create your stocks wishlist"})
        
class RetrieveUpdateWishList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShowWishlistSerializer
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
