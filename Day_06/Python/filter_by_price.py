products = [ 
    {"name": "Laptop", "price": 45000, "brand": "HP"}, 
    {"name": "Phone", "price": 25000, "brand": "Samsung"},
    {"name": "Earbuds", "price": 2000, "brand": "Boat"},
    {"name": "TV", "price": 38000, "brand": "Sony"},
                  ]

def filter_by_price(data, min_price):
    result = []

    for item in data:
        if item["price"] >= min_price:
            result.append(item)
    
    return result




filtered = filter_by_price(products, 10000)


print("filtered Products: ")
for p in filtered:
    print(f"Name: {p['name']}, Brand: {p['brand']}, Price: {p['price']}") 


sorted_list = sorted(filtered, key=lambda x: x["price"])

print("\nSorted List by Price:")
for p in sorted_list:
   print(f"Name: {p['name']}, Brand: {p['brand']}, Price: {p['price']}")