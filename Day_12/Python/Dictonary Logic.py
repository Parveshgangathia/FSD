# -----------------------------------------
# Employee Data (Nested Dictionary)
# -----------------------------------------

employees = {
    "emp1": {"name": "Aman", "salary": 35000, "age": 24},
    "emp2": {"name": "Tanvi", "salary": 42000, "age": 27},
    "emp3": {"name": "Karan", "salary": 29000, "age": 22},
    "emp4": {"name": "Simran", "salary": 50000, "age": 30},
    "emp5": {"name": "Parvesh", "salary": 99000, "age": 22},
    "emp6": {"name": "Bantu", "salary": 50000, "age": 30},
}

# -----------------------------------------
# 1️ high_salary(data, min_salary)
# → return employees with salary >= min_salary
# -----------------------------------------

def high_salary(data, min_salary):
    return {emp_id: details for emp_id, details in data.items() if details["salary"] >= min_salary}


# -----------------------------------------
# 2️ average_salary(data)
# → return average of all salaries
# -----------------------------------------

def average_salary(data):
    total = sum(emp["salary"] for emp in data.values())
    return total / len(data) if data else 0


# -----------------------------------------
# 3️ find_youngest(data)
# → return employee with lowest age
# -----------------------------------------

def find_youngest(data):
    return min(data.values(), key=lambda emp: emp["age"])


# -----------------------------------------
# 4️ display(data)
# → clean formatted output
# -----------------------------------------

def display(title, data):
    print(f"\n=== {title} ===")
    for emp in data.values():
        print(f"Name: {emp['name']:<10} | Salary: {emp['salary']:<6} | Age: {emp['age']}")


# -----------------------------------------
# MAIN PROGRAM OUTPUT
# -----------------------------------------

display("All Employees", employees)

# High Salary Employees
rich = high_salary(employees, 40000)
display("Employees with Salary >= 40000", rich)

# Average Salary
avg = average_salary(employees)
print(f"\nAverage Salary: {avg:.2f}")

# Youngest Employee
youngest = find_youngest(employees)
print(f"\nYoungest Employee: {youngest['name']} ({youngest['age']} years)") 
