from django.urls import path
from .views import TaskListCreate, home

urlpatterns = [
    path("", home),
    path("api/tasks/", TaskListCreate.as_view()),
]