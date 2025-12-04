data = {
    "product1": {"name": "Laptop", "price": 45000, "category": "Electronics"},
    "product2": {"name": "Shoes", "price": 2000, "category": "Fashion"},
    "product3": {"name": "Phone", "price": 30000, "category": "Electronics"},
    "product4": {"name": "Watch", "price": 1500, "category": "Fashion"},
}

# 1. List of only product names
product_names = [p["name"] for p in data.values()]

# 2. Filter products with price > 5000
expensive_products = {
    key: p for key, p in data.items() if p["price"] > 5000
}

# 3. Group products by category
grouped = {}
for p in data.values():
    cat = p["category"]
    grouped.setdefault(cat, []).append(p["name"])

# 4. Find product with highest price
highest_product = max(data.values(), key=lambda p: p["price"])

# 5. Apply 10% discount (new dictionary)
discounted = {
    key: {
        "name": p["name"],
        "price": round(p["price"] * 0.90),
        "category": p["category"]
    }
    for key, p in data.items()
}

# Print results
print("1. Product Names:", product_names)

print("\n2. Expensive Products (> 5000):")
for k, v in expensive_products.items():
    print(f"{v['name']} - {v['price']}")

print("\n3. Grouped by Category:")
for cat, items in grouped.items():
    print(cat, ":", items)

print("\n4. Highest Priced Product:")
print(highest_product["name"], "-", highest_product["price"])

print("\n5. Discounted Product List (10% off):")
for k, v in discounted.items():
    print(v["name"], "-", v["price"], "(", v["category"], ")")
