from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Welcome to the Task Manager API",
        "available_routes": [
            "/api/tasks/"
        ]
    })

# ... (Leave your TaskListCreate class below this) ...
class TaskListCreate(APIView):
    # 1. Handle GET requests (List all tasks)
    def get(self, request):
        tasks = Task.objects.all()
        # serializer converts DB objects -> JSON format
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    # 2. Handle POST requests (Create a new task)
    def post(self, request):
        # serializer converts JSON input -> Python object
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save() # Saves to DB automatically
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)