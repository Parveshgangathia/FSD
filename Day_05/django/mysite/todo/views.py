from django.shortcuts import render
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods

# temporary in-memory task store (demo only)
tasks = []

def home(request):
    """
    Show list of tasks and count.
    """
    return render(request, "todo/home.html", {"tasks": tasks})

@require_http_methods(["GET", "POST"])
def add(request):
    """
    Show add form on GET. On POST validate and append to tasks, then redirect.
    """
    if request.method == "POST":
        task = request.POST.get("task", "").strip()
        if task:
            tasks.append(task)
            return redirect("home")
        # if invalid, fall through to re-render form with an error message
        return render(request, "todo/add.html", {"error": "Please enter a task."})
    return render(request, "todo/add.html")

