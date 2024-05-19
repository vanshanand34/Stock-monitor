from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.ListCreateWishlist.as_view(),name="wishlistview"),
    path('edit/<int:pk>', views.RetrieveUpdateWishList.as_view(),name="wishlist_edit"),
    path('login',views.LoginView.as_view(),name="login"),
    path('register',views.RegisterView.as_view(),name="register")
]