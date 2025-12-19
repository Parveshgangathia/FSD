import csv

INPUT_FILE = "employees.csv"
OUTPUT_FILE = "tech_employees.csv"

employees = []

try:
    # 1. Read CSV file
    with open(INPUT_FILE, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        # 2. Convert rows to list of dicts
        for row in reader:
            row["salary"] = int(row["salary"])  # convert salary to int
            employees.append(row)

except FileNotFoundError:
    print("Error: employees.csv not found")
    exit()

except Exception as e:
    print("Unexpected error:", e)
    exit()

# 3. Filter Tech department
tech_employees = [
    emp for emp in employees if emp["dept"] == "Tech"
]

# 4. Write filtered rows to new CSV
try:
    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as file:
        fieldnames = ["name", "dept", "salary"]
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerows(tech_employees)

except Exception as e:
    print("Error writing file:", e)
    exit()

# 5. Compute average salary
if tech_employees:
    total_salary = sum(emp["salary"] for emp in tech_employees)
    average_salary = total_salary / len(tech_employees)
else:
    average_salary = 0

print("Tech Employees:")
print(tech_employees)

print("\nAverage Tech Salary:", average_salary)
print(f"\nFiltered data saved to '{OUTPUT_FILE}'")
