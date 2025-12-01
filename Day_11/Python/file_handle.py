# -----------------------------------------
# Step 1: Read File & Convert to List of Dicts
# -----------------------------------------

def read_students(filename):
    students = []

    with open(filename, "r") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            name, marks = line.split(",")
            students.append({
                "name": name,
                "marks": int(marks)
            })

    return students


# -----------------------------------------
# Step 2: Get Students Above Threshold
# -----------------------------------------

def get_toppers(data, threshold=80):
    toppers = [s for s in data if s["marks"] >= threshold]

    # Sort by marks descending → highest rank first
    toppers_sorted = sorted(toppers, key=lambda x: x["marks"], reverse=True)
    return toppers_sorted


# -----------------------------------------
# Step 3: Write Ranked Toppers to File
# -----------------------------------------

def write_toppers(filename, toppers):
    with open(filename, "w") as f:
        rank = 1
        for s in toppers:
            f.write(f"{rank}. {s['name']} — {s['marks']}\n")
            rank += 1


# -----------------------------------------
# Step 4: Main Program Output
# -----------------------------------------

students = read_students("students.txt")

print("=== All Students Loaded ===")
print(students)

toppers = get_toppers(students, threshold=80)

print("\n=== Ranked Toppers (>= 80) ===")
for i, t in enumerate(toppers, start=1):
    print(f"{i}. {t['name']} — {t['marks']}")

write_toppers("toppers.txt", toppers)

print("\nSummary:")
print(f"Total students read: {len(students)}")
print(f"Total toppers: {len(toppers)}")

print("\nRanked data written to toppers.txt successfully.")
