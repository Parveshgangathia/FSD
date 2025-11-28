# todo/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods, require_POST
from django.contrib import messages
from django.http import JsonResponse

from .models import Task

@require_http_methods(["GET"])
def home(request):
    """
    Show list of tasks (newest first).
    """
    tasks = Task.objects.order_by('-created_at')
    total = tasks.count()
    completed = tasks.filter(completed=True).count()
    return render(request, "todo/home.html", {
        "tasks": tasks,
        "total": total,
        "completed": completed,
    })

@require_http_methods(["GET", "POST"])
def add(request):
    """
    Show add form on GET. Create a Task on POST.
    """
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        if title:
            Task.objects.create(title=title)
            messages.success(request, "Task added.")
            return redirect("todo:home")
        return render(request, "todo/add.html", {"error": "Please enter a task title."})
    return render(request, "todo/add.html")

@require_POST
def toggle_complete(request, pk):
    """
    Toggle completed flag. Returns JSON for AJAX; otherwise redirects.
    """
    task = get_object_or_404(Task, pk=pk)
    task.completed = not task.completed
    task.save()

    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        return JsonResponse({"ok": True, "pk": task.pk, "completed": task.completed})
    return redirect("todo:home")

@require_POST
def delete_task(request, pk):
    """
    Delete a task. Returns JSON for AJAX; otherwise redirects.
    """
    task = get_object_or_404(Task, pk=pk)
    task.delete()

    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        return JsonResponse({"ok": True, "pk": pk})
    return redirect("todo:home")


def update(request, pk):
    task = get_object_or_404(Task, pk=pk)

    if request.method == "POST":
        new_title = request.POST.get("title")
        task.title = new_title
        task.save()
        return redirect("/")

    return render(request, "todo/update.html", {"task": task})