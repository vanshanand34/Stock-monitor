from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path('', views.ListCreateWishlist.as_view(),name="wishlistview"),
    path('delete', views.DeleteStock.as_view(),name="wishlistdelete"),
    path('login',views.Login.as_view(),name="login"),
    path('logout',views.Logout.as_view(),name="logout"),
    path('register',views.RegisterView.as_view(),name="register"),
]