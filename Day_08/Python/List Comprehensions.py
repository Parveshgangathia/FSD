numbers = [2, 5, 8, 11, 14, 17, 20]

# -------------------------------
# 🔥 LIST COMPREHENSION VERSION
# -------------------------------

# 1. Numbers greater than 10
greater_than_10 = [n for n in numbers if n > 10]

# 2. Numbers multiplied by 2
multiplied_by_2 = [n * 2 for n in numbers]

# 3. Even numbers
even_numbers = [n for n in numbers if n % 2 == 0]

# 4. String list
number_strings = [f"Number: {n}" for n in numbers]

print("List Comprehension Results:")
print("Greater than 10:", greater_than_10)
print("Multiplied by 2:", multiplied_by_2)
print("Even numbers:", even_numbers)
print("String list:", number_strings)

# -------------------------------
# 🐢 NORMAL LOOP VERSION
# -------------------------------

# 1. Numbers greater than 10
greater_than_10_loop = []
for n in numbers:
    if n > 10:
        greater_than_10_loop.append(n)

# 2. Numbers multiplied by 2
multiplied_by_2_loop = []
for n in numbers:
    multiplied_by_2_loop.append(n * 2)

# 3. Even numbers
even_numbers_loop = []
for n in numbers:
    if n % 2 == 0:
        even_numbers_loop.append(n)

# 4. String list
number_strings_loop = []
for n in numbers:
    number_strings_loop.append(f"Number: {n}")

print("\nNormal Loop Results:")
print("Greater than 10:", greater_than_10_loop)
print("Multiplied by 2:", multiplied_by_2_loop)
print("Even numbers:", even_numbers_loop)
print("String list:", number_strings_loop)
