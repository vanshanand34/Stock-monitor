from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.views.generic import View
from django.shortcuts import redirect
from rest_framework.response import Response
from django.contrib.auth import authenticate , login , logout 
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .serializers import WishlistSerializer , RegisterSerializer , ShowWishlistSerializer , UserSerializer
from .models import WishList

from .data import get_stock_data
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    

class Login(APIView):
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            token , _= Token.objects.get_or_create(user = request.user)
            return Response({"message":"User loggedin successfully","token":token.key})
        return Response({"Invalid credentials!!!!!!"})
    
class Logout(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            logout(request)
            return Response({"status":"user loggout out successfully"})
        return Response({"Message":"You must be signed in to log out"})

class DeleteStock(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self,request):
        mysymbol = request.POST["symbol"]
        obj = WishList.objects.get(user=request.user , symbol=mysymbol)
        if obj:
            obj.delete()
            return Response({"Stock deleted successfully"})
        return Response({"stock does not exists"})
            



class ListCreateWishlist(generics.ListCreateAPIView):
    serializer_class = ShowWishlistSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self,request):
        print("POSTED REQUEST")
        mydata = request.data.copy()
        mydata["user"] = request.user.id
        serializer = WishlistSerializer(data = mydata)
        print(request.data)
        if serializer.is_valid():
            if WishList.objects.filter(user = request.user,symbol=mydata["symbol"]).count()>=1:
                return Response({"status":"failed","Message":"The stock already exists in your wishlist !!!!!"})
            serializer.save()
            print(serializer.data)
            return Response({"Message":"Stock created successfully"})
        else:
            print(serializer.errors)
            return Response({"status":"failed","Error" :serializer.errors})
        
    def get_queryset(self):
        WishList.objects.all().delete()
        print(WishList.objects.all())
        '''function to extract latest stock information implemented the functionality to extract data from the stock API in get_stock_data function defined in data.py and extracting information about every stock in a user's wishlist ( only if user is signed in )'''
        print(self.request.user)
        myset = WishList.objects.filter(user=self.request.user)
        for obj in myset:
            data = get_stock_data(obj.symbol)
            obj.latest_value = data['latest_value']
            obj.change = data['change']
            print(obj)
            obj.save()
        return myset
        
# class RetrieveUpdateWishList(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ShowWishlistSerializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [TokenAuthentication]
#     def get_queryset(self,request):
#         '''edited the queryset function to extract latest stock information
#         implemented the functionality to extract data from the stock API in get_stock_data function defined in data.py
#         and extracting information about every stock in a user's wishlist ( only if user is signed in )'''

#         if(request.user.is_authenticated):
#             myset = WishList.objects.filter(user=request.user)
#             for obj in myset:
#                 print("symbol = ",obj.symbol)
#                 data = get_stock_data(obj.symbol)
#                 obj.latest_value = data['latest_value']
#                 obj.change = data['change']
#                 print(obj)
#                 obj.save()
#             return myset
#         else:
#             print("No")
#             return None
