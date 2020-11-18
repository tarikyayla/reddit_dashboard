# Generated by Django 3.1.2 on 2020-11-18 19:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('reddit_dashboard', '0013_posts_sentposts'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='subreddit',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='reddit_dashboard.subreddit'),
            preserve_default=False,
        ),
    ]