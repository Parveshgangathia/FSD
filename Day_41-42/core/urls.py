from django.urls import path
from .views import TaskListCreateView, home, TaskDetailView

urlpatterns = [
    path("", home),
    path("api/tasks/", TaskListCreateView.as_view()),      # List & Create
    path("api/tasks/<int:pk>/", TaskDetailView.as_view()), # Retrieve, Update, Delete
]