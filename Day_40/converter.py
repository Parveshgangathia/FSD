import json
import csv
import logging
import os
from datetime import datetime

# 1. Professional Logging Setup
# This looks better than simple 'print' statements and adds timestamps.
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

def generate_sample_data(filename):
    """Creates a dummy JSON file to test the converter."""
    data = [
        {"id": 1, "name": "Alice Johnson", "role": "Admin", "salary": 85000},
        {"id": 2, "name": "Bob Smith", "role": "Developer", "salary": 75000},
        {"id": 3, "name": "Charlie Brown", "role": "Designer", "salary": 65000},
        {"id": 4, "name": "Diana Ross", "role": "Manager", "salary": 95000}
    ]
    
    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)
        logger.info(f"✅ Generated sample data: {filename}")
        return True
    except IOError as e:
        logger.error(f"❌ Failed to create sample data: {e}")
        return False

def json_to_csv(json_file, csv_file):
    """Reads a JSON file and converts it to CSV with error handling."""
    
    # Validation: Check if file exists
    if not os.path.exists(json_file):
        logger.error(f"❌ File not found: {json_file}")
        return

    try:
        # Step 1: Read JSON
        logger.info(f"📂 Reading {json_file}...")
        with open(json_file, 'r') as f:
            data = json.load(f)

        if not data:
            logger.warning("⚠️ JSON file is empty.")
            return

        # Step 2: Extract Headers (keys from the first object)
        headers = data[0].keys()

        # Step 3: Write CSV
        logger.info(f"📝 Writing to {csv_file}...")
        with open(csv_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(data)

        logger.info(f"🚀 Success! Converted {len(data)} records to {csv_file}")

    except json.JSONDecodeError:
        logger.error("❌ Invalid JSON format. Please check the input file.")
    except PermissionError:
        logger.error(f"❌ Permission denied. Close {csv_file} if it's open.")
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")

def main():
    # Define file names
    source_file = "employees.json"
    output_file = "employees.csv"

    logger.info("--- Starting Converter Script ---")

    # Generate data first (so the script always works for you)
    if generate_sample_data(source_file):
        # Run conversion
        json_to_csv(source_file, output_file)
    
    logger.info("--- Process Finished ---")

if __name__ == "__main__":
    main()