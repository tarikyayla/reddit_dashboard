# Generated by Django 3.1.2 on 2020-11-14 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reddit_dashboard', '0011_discordserver_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='textchannel',
            name='following_subreddits',
            field=models.ManyToManyField(to='reddit_dashboard.Subreddit'),
        ),
    ]