
from django.urls import path
from . import views

app_name = "todo"

urlpatterns = [
    path("", views.home, name="home"),
    path("add/", views.add, name="add"),
    path("toggle/<int:pk>/", views.toggle_complete, name="toggle"),
    path("delete/<int:pk>/", views.delete_task, name="delete"),
    path('update/<int:pk>/', views.update, name='update'),
   
]
