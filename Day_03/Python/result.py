students = { "Amit": 85, "Riya": 92, "Karan": 76, "Simran": 90 }
 
count = 0


for name,marks in students.items():
    if marks > 80:
        print(f"Name: {name}, Marks: {marks}")
        count += 1

print(f"Total students scoring above 80: {count}")