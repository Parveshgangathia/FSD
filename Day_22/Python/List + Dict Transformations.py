products = [
    {"name": "Laptop", "price": 45000, "stock": 10},
    {"name": "Phone", "price": 30000, "stock": 0},
    {"name": "Watch", "price": 2000, "stock": 5},
    {"name": "Bag", "price": 800, "stock": 50},
]

# 1. List of names only
names = [p["name"] for p in products]
print("Names:", names)

# 2. Filter only products in stock (>0)
in_stock = [p for p in products if p["stock"] > 0]
print("In Stock:", in_stock)

# 3. List with 10% discounted price
discounted = [
    {"name": p["name"], "price": int(p["price"] * 0.9)}
    for p in products
]
print("Discounted Prices:", discounted)

# 4. Group into Expensive (>10,000) and Cheap (<=10,000)
groups = {"Expensive": [], "Cheap": []}

for p in products:
    if p["price"] > 10000:
        groups["Expensive"].append(p["name"])
    else:
        groups["Cheap"].append(p["name"])

print("Grouped Products:", groups)

# 5. Bonus: Sort by stock ascending
sorted_by_stock = sorted(products, key=lambda p: p["stock"])
print("Sorted by stock:", sorted_by_stock)
