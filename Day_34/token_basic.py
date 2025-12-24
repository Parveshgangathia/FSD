import base64
import json
import time
payload = {
    "user": "parvesh",
    "exp": time.time() + 3600  # expires in 1 hour
}
# Convert payload to JSON
payload_json = json.dumps(payload)

# Encode to base64
token = base64.b64encode(payload_json.encode()).decode()

print("Token:", token)
# Decode token
decoded_json = base64.b64decode(token).decode()
decoded_payload = json.loads(decoded_json)

print("Decoded payload:", decoded_payload)

current_time = time.time()

if decoded_payload["exp"] < current_time:
    print("Token expired")
else:
    print("Token valid")
