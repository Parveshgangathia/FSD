names = input("Enter names separated by commas: ").split(",")

formatted = []
for name in names:
    formatted.append(name.strip().title())

print("\nFormatted Names:")
for n in formatted:
    print("-", n)
