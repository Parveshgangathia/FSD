import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="bank.log"
)

class PermissionDenied(Exception):
    """Raised when user does not have permission to perform action"""
    pass


class InvalidInput(Exception):
    """Raised when input value is invalid"""
    pass


def withdraw(balance, amount):
    if amount <= 0:
        raise InvalidInput("Amount must be positive")

    if amount > balance:
        raise PermissionDenied("Insufficient funds")

    return balance - amount


def process_withdrawal(balance, amount):
    try:
        new_balance = withdraw(balance, amount)
        logging.info(f"Withdrawal successful: {amount}")
        print(f"✅ Withdrawal successful. New balance: {new_balance}")

    except InvalidInput as e:
        logging.error(f"Invalid input: {e}")
        print(f"❌ Error: {e}")

    except PermissionDenied as e:
        logging.warning(f"Permission denied: {e}")
        print(f"❌ Error: {e}")


print("\n--- TEST CASES ---")

print("\n1. Valid withdrawal")
process_withdrawal(5000, 1000)

print("\n2. Invalid amount (negative)")
process_withdrawal(5000, -200)

print("\n3. Insufficient funds")
process_withdrawal(5000, 6000)
