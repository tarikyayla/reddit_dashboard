# Generated by Django 3.1.2 on 2020-10-17 11:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Subreddit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('subscribers', models.BigIntegerField(default=0)),
                ('description', models.TextField(blank=True, null=True)),
                ('added_date', models.DateField(auto_now=True)),
                ('last_checked_date', models.DateTimeField()),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DiscordServer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('server_id', models.CharField(max_length=1000)),
                ('text_channel', models.CharField(max_length=255)),
                ('create_date', models.DateTimeField(auto_now=True)),
                ('added_by', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('subreddits', models.ManyToManyField(to='api.Subreddit')),
            ],
        ),
    ]
