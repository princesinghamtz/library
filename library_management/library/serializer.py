from rest_framework import serializers
from rest_framework.authtoken.admin import User

from library.models import Book


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'