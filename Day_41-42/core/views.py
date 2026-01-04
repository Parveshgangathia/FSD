from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

from django.http import JsonResponse

from django.shortcuts import get_object_or_404

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
    
class TaskDetail(APIView):
    # 1. GET: Retrieve a single task by ID
    def get(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    # 2. PUT: Fully replace a task
    def put(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 3. PATCH: Partially update a task (e.g., just mark completed)
    def patch(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        # partial=True allows sending just ONE field
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 4. DELETE: Remove the task
    def delete(self, request, pk):
        task = get_object_or_404(Task, pk=pk)
        task.delete()
        # 204 No Content = "Success, but I have nothing to show you because it's gone"
        return Response(status=status.HTTP_204_NO_CONTENT)