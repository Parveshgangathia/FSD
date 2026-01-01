from django.shortcuts import render
from .models import Task
import json
from django.views.decorators.csrf import csrf_exempt
# HttpResponse
from django.http import HttpResponse, JsonResponse

# 1. Simple Text Response (Sanity Check)
def home(request):
    return HttpResponse("Backend is working!")

# 2. JSON Response (The Language of APIs)
def hello_api(request):
    data = {
        "message": "Hello from Django!",
        "status": "success"
    }
    return JsonResponse(data)
# Reading from database
def tasks_list(request):
    # 1. Get all tasks from the DB
    tasks = Task.objects.all()

    # 2. Convert Python objects to a simple list of dictionaries
    data = []
    for task in tasks:
        data.append({
            "id": task.id,
            "title": task.title,
            "completed": task.completed
        })

    # 3. Return as JSON
    # 'safe=False' is needed because we are sending a list, not a dict
    return JsonResponse(data, safe=False)

#Writing to the Datebase (POST)
@csrf_exempt  # Allows requests without a browser cookie (good for APIs)
def create_task(request):
    # Only allow POST method
    if request.method == "POST":
        # 1. Parse the incoming JSON data
        try:
            body = json.loads(request.body)

            # 2. Create the task in the database
            task = Task.objects.create(
                title=body.get("title", "Untitled Task")
            )

            # 3. Return the new task back to the user
            return JsonResponse({
                "id": task.id,
                "title": task.title,
                "completed": task.completed,
                "message": "Task created successfully"
            })
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "POST method required"}, status=405)