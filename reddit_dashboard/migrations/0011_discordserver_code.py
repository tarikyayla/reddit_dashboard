# Generated by Django 3.1.2 on 2020-11-14 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reddit_dashboard', '0010_auto_20201114_2015'),
    ]

    operations = [
        migrations.AddField(
            model_name='discordserver',
            name='code',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
