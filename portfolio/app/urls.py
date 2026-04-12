from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('repos', views.repos, name='repos'),
]