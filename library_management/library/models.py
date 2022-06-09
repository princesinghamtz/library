from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Book(models.Model):
    statu_list = (('1', 'Activate'), ('2', 'Delete'))
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    logo = models.FileField(upload_to='Upload/Book-image', blank=True, null=True)
    status = models.CharField(max_length=50, choices=statu_list, default='1')
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name