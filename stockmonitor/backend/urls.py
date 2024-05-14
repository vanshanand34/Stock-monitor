from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.ListCreateWishlist.as_view(),name="wishlistview"),
    path('edit/', views.RetrieveUpdateWishList.as_view(),name="wishlist_edit")
]