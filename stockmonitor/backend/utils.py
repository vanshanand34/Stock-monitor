from .models import WishList
from .data import get_stock_data

def update_stock_data(user):
    wishlists = WishList.objects.filter(user = user)
    for wishlist in wishlists:
        api_response = get_stock_data(wishlist.symbol)
        wishlist.latest_value = api_response['latest_value']
        wishlist.change = api_response['change']
        wishlist.save()

