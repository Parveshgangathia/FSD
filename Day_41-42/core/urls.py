from django.urls import path
from .views import TaskListCreate, home, TaskDetail

urlpatterns = [
    path("", home),
    path("api/tasks/", TaskListCreate.as_view()),      # List & Create
    path("api/tasks/<int:pk>/", TaskDetail.as_view()), # Retrieve, Update, Delete
]