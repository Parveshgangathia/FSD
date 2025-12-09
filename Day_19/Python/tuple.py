# -------------------------------
# Given Data
# -------------------------------

students = ("Aman", "Riya", "Simran", "Aman", "Karan", "Riya")
marks = (85, 92, 76, 85, 90, 92)

# ---------------------------------------
# 1. Convert students tuple → set (unique)
# ---------------------------------------

unique_students = set(students)
print("Unique Students:", unique_students)

# ---------------------------------------
# 2. Create set of marks > 80
# ---------------------------------------

marks_above_80 = {m for m in marks if m > 80}
print("Marks > 80:", marks_above_80)

# ---------------------------------------------------------------
# 3. Pair unique student names with their highest mark
# ---------------------------------------------------------------

# Build mapping: name → list of scores
score_map = {}

for name, score in zip(students, marks):
    if name not in score_map:
        score_map[name] = []
    score_map[name].append(score)

# Now extract highest mark for each unique student
paired_list = [(name, max(scores)) for name, scores in score_map.items()]

print("Paired (Name, Highest Mark):", paired_list)

# ---------------------------------------------------------------
# 4. Convert paired list into a dictionary
# ---------------------------------------------------------------

result_dict = {name: mark for name, mark in paired_list}
print("Final Dictionary:", result_dict)

# ---------------------------------------------------------------
# 5. Try/Except for IndexError when accessing tuple
# ---------------------------------------------------------------

print("\nTesting tuple access with try/except:")

try:
    # Intentionally accessing out of range (index 10)
    print(students[10])
except IndexError:
    print("Error: Index out of range while accessing tuple!")
