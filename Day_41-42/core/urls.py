from django.urls import path
from .views import home, hello_api, tasks_list, create_task

urlpatterns = [
    path("", home),           # Root URL (http://127.0.0.1:8000/)
    path("hello/", hello_api), # API URL (http://127.0.0.1:8000/hello/)
    path("tasks/", tasks_list), #http://127.0.0.1:8000/tasks/
    path("tasks/create/", create_task),
]