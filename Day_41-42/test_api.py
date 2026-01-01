import requests

url = "http://127.0.0.1:8000/tasks/create/"
payload = {"title": "Learn Django Views"}

response = requests.post(url, json=payload)

print("Status Code:", response.status_code)
print("Response:", response.json())