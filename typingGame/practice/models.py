from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

# Create your models here.
class Doc(models.Model):
    user = models.ForeignKey("User",  on_delete=models.CASCADE, related_name="docs")
    userId = models.IntegerField(null=False, blank=False)
    createdTime = models.DateTimeField(auto_now_add=True)
    docName = models.CharField(max_length=255)
    docContent = models.TextField(blank=True)

class Score(models.Model):
    user = models.ForeignKey("User",  on_delete=models.CASCADE, related_name="scores")
    userId = models.IntegerField(null=False, blank=False)
    docId = models.IntegerField(null=False, blank=False)
    timeStamp = models.DateTimeField(auto_now_add=True)    
    speed = models.IntegerField(null=False, blank=False)
    accuracy = models.IntegerField(null=False, blank=False)

