# Generated by Django 4.0.5 on 2022-06-08 09:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_alter_book_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='image',
            new_name='logo',
        ),
    ]