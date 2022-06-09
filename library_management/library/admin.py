from django.contrib import admin
from .models import *


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'author', 'status', 'upload_date')
    list_filter = []
    search_fields = ['name', 'author', 'status']
    fieldsets = (
        ('Book Details', {'fields': ('name', 'author', 'description', 'logo', 'status', 'upload_date')}),
    )
    readonly_fields = ['upload_date']
