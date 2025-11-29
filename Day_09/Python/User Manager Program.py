# List of users
users = [
    {"name": "Aman", "age": 22},
    {"name": "Riya", "age": 19},
    {"name": "Karan", "age": 25},
    {"name": "Simran", "age": 17},
]

# ---------------------------------------------------------
# 1️⃣ get_adults(users) → return users age ≥ 18
# ---------------------------------------------------------
def get_adults(users):
    return [u for u in users if u["age"] >= 18]


# ---------------------------------------------------------
# 2️⃣ average_age(users) → return average of all ages
# ---------------------------------------------------------
def average_age(users):
    total = sum(u["age"] for u in users)
    return total / len(users) if users else 0


# ---------------------------------------------------------
# oldest_user(users) → return user with highest age
# ---------------------------------------------------------
def oldest_user(users):
    return max(users, key=lambda u: u["age"])


# ---------------------------------------------------------
#  print nicely formatted user data
# ---------------------------------------------------------
def print_users(title, users_list):
    print(f"\n=== {title} ===")
    for u in users_list:
        print(f"Name: {u['name']:<10} | Age: {u['age']}")


# ---------------------------------------------------------
# Main Program Output
# ---------------------------------------------------------

print_users("All Users", users)

adults = get_adults(users)
print_users("Adults (18+)", adults)

avg = average_age(users)
print(f"\nAverage Age: {avg:.2f}")

oldest = oldest_user(users)
print(f"\nOldest User: {oldest['name']} ({oldest['age']} years)")
