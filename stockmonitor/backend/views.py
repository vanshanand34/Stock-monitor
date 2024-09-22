from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import (
    WishlistSerializer,
    RegisterSerializer,
    ShowWishlistSerializer,
)
from .models import WishList
from .utils import update_stock_data


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()


class Login(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=request.user)
                return Response(
                    {"message": "User loggedin successfully", "token": token.key}
                )
            return Response({"Invalid credentials!!!!!!"})
        except Exception as e:
            print("Some error occured, :", e)
            return Response({"message":"Serve Error"})


class Logout(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request, request.user)
        return Response({"status": 200, "message": "Logged out successfully"})


class DeleteStock(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        mysymbol = request.data.get("symbol")
        if not mysymbol:
            return Response({"status":400, "error":"Invalid or empty stock symbol"})
        obj = WishList.objects.filter(user=request.user, symbol=mysymbol).first()
        if not obj:
            return Response({"stock does not exists"})
        obj.delete()
        print("Stock deleted successfully")
        return Response({"Stock deleted successfully"})
        


class ListCreateWishlist(generics.ListCreateAPIView):
    serializer_class = ShowWishlistSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request_data = request.data.copy()
        symbol = request.data.get("symbol")
        if not symbol:
            return Response({"status":400,"error":"symbol field is required"})
        request_data["symbol"] = symbol.strip()
        request_data["user"] = request.user.id
        serializer = WishlistSerializer(data=request_data)
        if serializer.is_valid():
            wishlist_count = WishList.objects.filter(
                user=request.user,
                symbol=request_data['symbol']
            )
            print(wishlist_count)
            if (wishlist_count):
                return Response({
                    "status": "failed",
                    "Message": "The stock already exists in your wishlist !!!!!",
                })
            serializer.save()
            print(serializer.data)
            return Response({"status":200,"message": "Stock created successfully","data":serializer.data})
        else:
            print(serializer.errors)
            return Response({"status": 400, "error": serializer.errors})

    def get_queryset(self):
        """function to extract latest stock information"""
        print(self.request.user)
        update_stock_data(self.request.user)
        queryset = WishList.objects.filter(user=self.request.user)
        return queryset


