products = [
    {"name": "Laptop", "price": 45000, "rating": 4.5},
    {"name": "Phone", "price": 30000, "rating": 4.2},
    {"name": "Shoes", "price": 2000, "rating": 4.0},
    {"name": "Watch", "price": 1500, "rating": 3.8},
]

# 1️⃣ Sort products by price (ascending)
sorted_by_price = sorted(products, key=lambda x: x["price"])
print("Sorted by Price (Ascending):")
print(sorted_by_price)
print()

# 2️⃣ Sort products by rating (descending)
sorted_by_rating = sorted(products, key=lambda x: x["rating"], reverse=True)
print("Sorted by Rating (Descending):")
print(sorted_by_rating)
print()

# 3️⃣ Filter products with price > 5000
expensive_products = list(filter(lambda x: x["price"] > 5000, products))
print("Products with Price > 5000:")
print(expensive_products)
print()

# 4️⃣ Create formatted list of strings
formatted_list = list(
    map(lambda x: f'{x["name"]} — ₹{x["price"]} — Rating: {x["rating"]}', products)
)
print("Formatted Product Strings:")
print(formatted_list)
print()

# 5️⃣ BONUS: List comprehension for discounted prices
discounted_prices = [p["price"] * 0.9 for p in products]
print("Discounted Prices (10% off):")
print(discounted_prices)
