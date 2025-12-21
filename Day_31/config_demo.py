import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Read environment variables
DEBUG = os.getenv("DEBUG")
API_KEY = os.getenv("API_KEY")

print("DEBUG:", DEBUG)
print("API_KEY:", API_KEY)
