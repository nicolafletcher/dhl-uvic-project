from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name
