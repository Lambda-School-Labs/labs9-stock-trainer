# Generated by Django 2.1.5 on 2019-01-10 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stockTrainerApp', '0003_auto_20190110_1439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]