from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from django.core import serializers
from .models import User
from .forms import AddUserForm
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def index(request):
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)

# I wasn't able to get the csrf token working, so I ended up just having to exempt it for the post request to work. 
# I known in a real situation this isn't very secure
@csrf_exempt
def add(request):
    if request.method == 'POST': 
            data = json.loads(request.body)
            form = AddUserForm(data)
            if form.is_valid(): 
                form.save()
                return HttpResponse(status=201)
            else: 
                print("errors : {}".format(form.errors))
                return HttpResponseBadRequest('Invalid request data')
