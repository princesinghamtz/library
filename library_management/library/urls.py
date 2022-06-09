from django.urls import path, include
from library import views

urlpatterns = [
    path('signup', views.signup, name="signup"),
    path('add-book', views.add_book, name="add_book"),
    # path('update-book', views.update_book, name="update_book"),
    path('delete-book', views.delete_book, name="delete_book"),
    path('view-book', views.view_book, name="view_book"),

]
