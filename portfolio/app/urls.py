from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('repos', views.repos, name='repos'),
    # path('cybersecurity', views.cybersecurity, name='cybersecurity'),
    # path('canva', views.canva, name='canva'),
    # path('claude', views.claude, name='claude'),
]