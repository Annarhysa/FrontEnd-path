from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def home(request):
    a=5
    return HttpResponse("Hey, I am Annarhysa Albert and this is my Django Website")
