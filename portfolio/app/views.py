from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def devops(request):
    return render(request, 'devops/devops.html')

def repos(request):
    return render(request, 'repos.html')

def canva(request):
    return render(request, 'canva.html')

def claude(request):
    return render(request, 'claude.html')