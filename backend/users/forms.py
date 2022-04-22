from django import forms
from .models import User 
#A form created from the User model to allow for easy input validation within views.py
class AddUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name']
