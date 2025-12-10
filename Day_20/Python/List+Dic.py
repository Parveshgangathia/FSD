employees = [
    {"name": "Aman", "dept": "Sales", "salary": 35000},
    {"name": "Riya", "dept": "Tech", "salary": 50000},
    {"name": "Simran", "dept": "HR", "salary": 30000},
    {"name": "Karan", "dept": "Tech", "salary": 60000},
]

# 1. List of employees in Tech department
tech_employees = [emp for emp in employees if emp["dept"] == "Tech"]
print("Tech employees:", tech_employees)

# 2. Salaries above 40,000
high_salaries = [emp["salary"] for emp in employees if emp["salary"] > 40000]
print("Salaries > 40000:", high_salaries)

# 3. Sort employees by salary (descending)
sorted_by_salary = sorted(employees, key=lambda x: x["salary"], reverse=True)
print("Employees sorted by salary:", sorted_by_salary)

# 4. Group by department
dept_group = {}
for emp in employees:
    dept = emp["dept"]
    name = emp["name"]
    if dept not in dept_group:
        dept_group[dept] = []
    dept_group[dept].append(name)

print("Department grouped:", dept_group)

# 5. Create descriptive list of strings
descriptions = [f"{emp['name']} works in {emp['dept']} and earns {emp['salary']}" for emp in employees]
print("Descriptions:", descriptions)

# 6. Bonus: Average salary per department
dept_salary_map = {}

for emp in employees:
    dept = emp["dept"]
    salary = emp["salary"]
    
    if dept not in dept_salary_map:
        dept_salary_map[dept] = []
    dept_salary_map[dept].append(salary)

avg_salary_per_dept = {
    dept: sum(salaries) / len(salaries)
    for dept, salaries in dept_salary_map.items()
}

print("Average salary per department:", avg_salary_per_dept)
