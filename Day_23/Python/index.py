users = []

# 1. Read file safely
try:
    with open("users.txt", "r") as file:
        for line in file:
            name, dept, salary = line.strip().split(",")

            users.append({
                "name": name,
                "dept": dept,
                "salary": int(salary)
            })

except FileNotFoundError:
    print("File not found!")
    exit()

# 2. List of dicts
print("All Users:")
print(users)

# 3. Filter only Tech department
tech_users = [u for u in users if u["dept"] == "Tech"]
print("\nTech Users:")
print(tech_users)

# 4. Compute average salary
total_salary = sum(u["salary"] for u in users)
average_salary = total_salary / len(users)
print("\nAverage Salary:", average_salary)

# 5. Group names by department
grouped = {}

for u in users:
    dept = u["dept"]
    grouped.setdefault(dept, []).append(u["name"])

print("\nGrouped by Department:")
print(grouped)
