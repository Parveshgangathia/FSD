from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.

def home(request):
    return HttpResponse("Welcome to Day 3 Django!")

def home(request):
    return render(request, "myapp/home.html")
def about(request):
    return render(request, "myapp/about.html")
def contact(request):
    return render(request, "myapp/contact.html")
