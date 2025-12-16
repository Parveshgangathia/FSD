import requests
import json

URL = "https://jsonplaceholder.typicode.com/posts"
OUTPUT_FILE = "posts.json"

try:
    # 1. Make API request
    response = requests.get(URL, timeout=10)

    # 2. Print status code
    print("Status Code:", response.status_code)

    # Raise error for bad responses (4xx, 5xx)
    response.raise_for_status()

    # 3. Parse JSON
    posts = response.json()

    # 4. Print first 5 post titles
    print("\nFirst 5 Post Titles:")
    for post in posts[:5]:
        print("-", post["title"])

    # 5. Filter posts where userId == 1
    filtered_posts = [post for post in posts if post["userId"] == 1]

    # 6. Save filtered posts to JSON file
    with open(OUTPUT_FILE, "w") as file:
        json.dump(filtered_posts, file, indent=2)

    print(f"\nFiltered posts saved to '{OUTPUT_FILE}'")

except requests.exceptions.Timeout:
    print("Error: Request timed out")

except requests.exceptions.ConnectionError:
    print("Error: Network connection problem")

except requests.exceptions.HTTPError as e:
    print("HTTP Error:", e)

except requests.exceptions.RequestException as e:
    print("Unexpected error:", e)

