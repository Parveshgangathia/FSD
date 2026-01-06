from rest_framework import generics
from django.http import JsonResponse
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] # <--- Lock the door

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] # <--- Lock this too

# --- 1. The Home View (Restored) ---
def home(request):
    return JsonResponse({
        "message": "Welcome to the Task Manager API",
        "available_routes": [
            "/api/tasks/",
            "/api/tasks/<id>/"
        ]
    })

# --- 2. The List & Create View (Generic) ---
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# --- 3. The Detail View (Generic) ---
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer