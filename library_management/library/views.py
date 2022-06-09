import json
import traceback

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from library.message import res
from library.models import *
# Create your views here.
from library.serializer import *


@ api_view(['POST'])
def signup(request):
    serializer = UserSerializer(User, data=request.data)
    if serializer.is_valid():
        # validating for already existing data
        get_user_details = User.objects.filter(email=request.data['email']).first()
        if get_user_details is None:
            return Response(res.response_json(201, 3))
        else:
            if get_user_details.check_password(request.data['password']):
                result = UserSerializer(get_user_details)
                return Response(res.response_json(200, 1, result.data))
            else:
                return Response(res.response_json(201, 4))
    else:
        return Response(res.response_json(201, 5))


# Api of view the Books
@api_view(['GET'])
def view_book(request):
    item = Book.objects.filter(status=1)
    if item:
        result = BookSerializer(item, many=True)
        return Response(res.response_json(200, 1, result.data))
    else:
        return Response(res.response_json(201, 7))


# Api Of Admin Add the Book

@api_view(['POST'])
def add_book(request):
    data = json.loads(request.data['data'])
    item = BookSerializer(data=request.data, many=True)
    if data['id']:
        if item.is_valid():
            book_item = Book.objects.get(pk=data['id'])
            book_item.name = data['book']
            book_item.author = data['author']
            book_item.description = data['description']
            book_item.save()
            if request.data['logo']:
                book_item.logo = request.data['logo']
                book_item.save()
            return Response(res.response_json(200, 1))
    else:
        if item.is_valid():
           book_obj = Book.objects.create(name=data['book'], author=data['author'],
                                          description=data['description'], logo=request.data['logo'])
           book_obj.save()
           return Response(res.response_json(200, 1))
        else:
            return Response(res.response_json(201, 5))

# Here i do the Soft delete the Book Details Because of Backup purpose of data .

@api_view(['POST'])
def delete_book(request):
    try:
        data = json.loads(request.data['data'])
        item = Book.objects.get(pk=data['id'])
        if item:
            item.status = '2'
            item.save()
            return Response(res.response_json(200, 1,))
        else:
            return Response(res.response_json(201, 7))

    except Exception as e:
        traceback.print_exc(e)