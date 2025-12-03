numbers = [3, 10, 15, 22, 48, 55, 63, 70]

# 1️ Even numbers
even_numbers = [n for n in numbers if n % 2 == 0]

# 2️ Odd numbers
odd_numbers = [n for n in numbers if n % 2 != 0]

# 3️ Numbers divisible by 5
div_by_5 = [n for n in numbers if n % 5 == 0]

# 4️⃣ Numbers > 20 doubled
greater_20_doubled = [n * 2 for n in numbers if n > 20]

# 5️ Create list: "3 is odd", "10 is even", ...
even_odd_strings = [
    f"{n} is even" if n % 2 == 0 else f"{n} is odd"
    for n in numbers
]

# BONUS: Convert all names to Title Case
names = ["parvesh", "aman", "riya", "simran", "dev"]
title_case_names = [name.title() for name in names]

# ---------- PRINT OUTPUT ----------
print("Even numbers:", even_numbers)
print("Odd numbers:", odd_numbers)
print("Divisible by 5:", div_by_5)
print("Numbers > 20 doubled:", greater_20_doubled)
print("Even/Odd Strings:", even_odd_strings)
print("Title Case Names:", title_case_names)
