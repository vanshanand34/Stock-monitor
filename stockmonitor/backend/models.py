from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class WishList(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    latest_value = models.CharField(max_length=60,blank=True,null=True)
    change = models.CharField(max_length=60,blank=True,null=True)

    def __str__(self):
        return self.symbol