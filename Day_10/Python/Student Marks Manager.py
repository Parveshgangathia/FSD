
# Input 

students = [
    {"name": "Amit", "marks": 85},
    {"name": "Riya", "marks": 92},
    {"name": "Karan", "marks": 76},
    {"name": "Simran", "marks": 90},
]


# 1️ top_students(data, threshold)
#    → return students with marks >= threshold

def top_students(data, threshold):
    return [s for s in data if s["marks"] >= threshold]



# 2️ average_marks(data)
#    → return average marks

def average_marks(data):
    total = sum(s["marks"] for s in data)
    return total / len(data) if data else 0


# 3️ highest(data)
#    → return student with highest mark
def highest(data):
    return max(data, key=lambda s: s["marks"])


# 4️ display(data)
#    → print clean formatted table
def display(data, title="Students"):
    print(f"\n=== {title} ===")
    print(f"{'Name':<10} | {'Marks':<5}")
    print("-" * 20)
    for s in data:
        print(f"{s['name']:<10} | {s['marks']:<5}")



# BONUS:
# Sorted (Descending by Marks)

def sorted_by_marks_desc(data):
    return sorted(data, key=lambda s: s["marks"], reverse=True)



# Main Program Output

display(students, "All Students")

# Top Students (>= 85)
ts = top_students(students, 85)
display(ts, "Top Students (>=85)")

# Average Marks
avg = average_marks(students)
print(f"\nAverage Marks: {avg:.2f}")

# Highest Scorer
topper = highest(students)
print(f"\nHighest Scorer: {topper['name']} ({topper['marks']} marks)")

# Sorted List
sorted_list = sorted_by_marks_desc(students)
display(sorted_list, "Sorted by Marks (DESC)")
