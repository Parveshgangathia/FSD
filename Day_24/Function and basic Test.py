# -----------------------
# Core Functions
# -----------------------

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero is not allowed")
    return a / b


# -----------------------
# Simple Tests (Assertions)
# -----------------------

# Addition
assert add(2, 3) == 5
assert add(-1, 1) == 0

# Subtraction
assert subtract(10, 5) == 5
assert subtract(5, 10) == -5

# Multiplication
assert multiply(4, 3) == 12
assert multiply(0, 5) == 0

# Division
assert divide(10, 2) == 5
assert divide(9, 3) == 3

# Division by zero test
try:
    divide(10, 0)
except ValueError as e:
    assert str(e) == "Division by zero is not allowed"

print("All tests passed successfully.")
