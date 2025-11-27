names = ["parvesh kumar", "riya sharma", "aman verma", "simran kaur"]

formatted = []
count_end_with_a = 0

for name in names:
    # Convert to Title Case
    title_name = name.title()
    formatted.append(title_name)

    # Check if the last letter is 'a'
    if title_name.endswith("a"):
        count_end_with_a += 1

# Print results
print("Formatted Names:")
for n in formatted:
    print("-", n)

print("\nTotal names ending with 'a':", count_end_with_a)
