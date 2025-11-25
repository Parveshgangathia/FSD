items = [
    {"name": "Shoes", "price": 1200},
    {"name": "Bag", "price": 800},
    {"name": "Watch", "price": 3500},
    {"name": "Hat", "price": 400}
]

def expensive_items(data):
    result = []            

    for item in data:      
        if item["price"] > 1000:
            result.append(item)   

    return result            




exp_items = expensive_items(items)


print("Expensive Items:")
for item in exp_items:
    print("-", item["name"])

# Print count
print("Total expensive items:", len(exp_items)) 