import requests
import json

url = "https://jsonplaceholder.typicode.com/posts"

payload = {
    "title": "Learning React",
    "body": "Posting data from Python",
    "userId": 1
}

try:
    # Send POST request
    response = requests.post(url, json=payload, timeout=10)

    # Print status code
    print("Status Code:", response.status_code)

    # Parse response JSON
    data = response.json()
    print("\nResponse JSON:")
    print(data)

    # Check for successful creation
    if response.status_code == 201:
        print("\nPost created successfully.")
    else:
        print("\nUnexpected status code received.")

    # Save response to file
    with open("created_post.json", "w") as file:
        json.dump(data, file, indent=2)

    print("\nResponse saved to created_post.json")

except requests.exceptions.Timeout:
    print("Error: Request timed out")

except requests.exceptions.ConnectionError:
    print("Error: Network connection problem")

except requests.exceptions.RequestException as e:
    print("Unexpected error:", e)
