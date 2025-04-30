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


def formatted_response(status: bool, message: str | dict, data=None):
    if not status:
        return Response({"status": status, "error": message})
    return Response({"status": status, "message": message, "data": data})


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()

    def _register(self, request):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return formatted_response(False, serializer.errors)
        return formatted_response(True, "User registered successfully")

    def post(self, request, *args, **kwargs):
        return self._register(request)


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
                    {
                        "message": "User loggedin successfully",
                        "token": token.key,
                        "status": True,
                    }
                )
            return formatted_response(False, "Invalid credentials")
        except Exception as e:
            print("Some error occured, :", e)
            return formatted_response(False, "Server Error")


class Logout(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return formatted_response(True, "Logged out successfully")


class DeleteStock(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        stock_to_delete = request.data.get("symbol")

        if not stock_to_delete:
            return formatted_response(False, "Invalid or empty stock symbol")

        stock_obj = WishList.objects.filter(
            user=request.user, symbol=stock_to_delete
        ).first()

        if not stock_obj:
            return formatted_response(False, "Stock does not exists")

        stock_obj.delete()
        return formatted_response(True, "Stock deleted successfully")


class ListCreateWishlist(generics.ListCreateAPIView):
    serializer_class = ShowWishlistSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        request_data = request.data.copy()
        stock_symbol = request.data.get("symbol")

        if not stock_symbol:
            return formatted_response(False, "Symbol field is required")

        request_data["symbol"] = stock_symbol.strip()
        request_data["user"] = request.user.id
        serializer = WishlistSerializer(data=request_data)

        if serializer.is_valid():
            wishlist_count = WishList.objects.filter(
                user=request.user, symbol=request_data["symbol"]
            )

            if wishlist_count:
                return formatted_response(
                    False,
                    "The stock already exists in your wishlist",
                )

            serializer.save()
            print(serializer.data)
            return formatted_response(
                {
                    True,
                    "Stock created successfully",
                    serializer.data,
                }
            )
        else:
            return formatted_response(False, serializer.errors)

    def get_queryset(self):
        """function to extract latest stock information"""
        print(self.request.user)
        update_stock_data(self.request.user)
        queryset = WishList.objects.filter(user=self.request.user)
        return queryset
