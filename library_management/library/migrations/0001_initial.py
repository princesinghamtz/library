# Generated by Django 4.0.5 on 2022-06-07 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload_date', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=100)),
                ('description', models.CharField(blank=True, max_length=20)),
                ('image', models.FileField(blank=True, null=True, upload_to='Upload/Book-image')),
                ('status', models.CharField(choices=[('1', 'Activate'), ('2', 'Delete')], default='1', max_length=50)),
            ],
        ),
    ]