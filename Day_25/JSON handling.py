import json

file_name = "data.json"

# 1. Load JSON file safely
try:
    with open(file_name, "r") as file:
        products = json.load(file)

except FileNotFoundError:
    print("File not found!")
    products = []

# 2. Print all product names
print("Product Names:")
for product in products:
    print(product["name"])

# 3. Filter products with price > 5000
expensive_products = [
    p for p in products if p["price"] > 5000
]

print("\nProducts with price > 5000:")
print(expensive_products)

# 4. Add new product
new_product = {"name": "Headphones", "price": 4000}
products.append(new_product)

# 5. Save back to JSON file
with open(file_name, "w") as file:
    json.dump(products, file, indent=2)

print("\nNew product added and file updated successfully.")
