# -------------------------------
# Python Error Handling Practice
# -------------------------------

#  Ask user to input a number
user_input = input("Enter a number: ")

#  Convert to int using try/except
try:
    number = int(user_input)
    print("You entered:", number)
except ValueError:
    print("Please enter a valid number!")
    number = None  # prevent crash later


# ---------------------------------
#  Safe division using try/except
# ---------------------------------

def divide(a, b):
    return a / b

print("\n--- Division Test ---")

try:
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    
    result = divide(a, b)
    print("Result:", result)

except ZeroDivisionError:
    print("Error: Cannot divide by zero!")

except ValueError:
    print("Please enter valid numbers!")


# -------------------------------
#  File Reader with Error Handling
# -------------------------------

print("\n--- File Reader ---")

try:
    with open("data.txt", "r") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found!")


# -------------------------------
#  Bonus: Custom Error
# -------------------------------

def check_marks(marks):
    if marks < 0:
        raise ValueError("Marks cannot be negative")
    return "Marks accepted:", marks

print("\n--- Bonus: Custom Error ---")

try:
    m = int(input("Enter your marks: "))
    print(check_marks(m))

except ValueError as e:
    print("Error:", e)
