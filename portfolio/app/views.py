from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def repos(request):
    return render(request, 'repos.html')