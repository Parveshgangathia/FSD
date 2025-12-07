# -----------------------------
# Store Dictionaries
# -----------------------------

store_a = {
    "laptop": 45000,
    "mouse": 500,
    "keyboard": 1500,
}

store_b = {
    "laptop": 43000,
    "headphones": 2000,
    "keyboard": 1400,
}

# -----------------------------------------------------
# 1️.) Merge both stores — take LOWER price if duplicate
# -----------------------------------------------------

merged_store = {}

# Add items from store_a
for item, price in store_a.items():
    merged_store[item] = price

# Add/compare items from store_b
for item, price in store_b.items():
    if item in merged_store:
        merged_store[item] = min(merged_store[item], price)
    else:
        merged_store[item] = price

print("Merged Store:")
print(merged_store)
print()


# ----------------------------------------
# 2️.) List of items cheaper than ₹2000
# ----------------------------------------

cheap_items = [item for item, price in merged_store.items() if price < 2000]

print("Items cheaper than ₹2000:")
print(cheap_items)
print()


# ----------------------------------------
# 3️.) Sort products by price (ascending)
# ----------------------------------------

sorted_products = sorted(merged_store.items(), key=lambda x: x[1])

print("Sorted products by price:")
print(sorted_products)
print()


# ----------------------------------------
# 4️.) Find the most expensive item
# ----------------------------------------

most_expensive = max(merged_store.items(), key=lambda x: x[1])

print("Most expensive item:")
print(most_expensive)
print()


# ---------------------------------------------------
# 5️.) BONUS: Create list of {"item": name, "price": x}
# ---------------------------------------------------

structured_list = [{"item": item, "price": price} for item, price in merged_store.items()]

print("Structured list:")
print(structured_list)
