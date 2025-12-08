from datetime import datetime

class BankAccount:

    def __init__(self, name, balance):
        self.name = name
        self.__balance = balance      # private variable
        self.transactions = []        # bonus: transaction history

        self._record("Account created", balance)

    # -------------------------------
    # 1️ Deposit
    # -------------------------------
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")

        self.__balance += amount
        self._record("Deposit", amount)

    # -------------------------------
    # 2️ Withdraw
    # -------------------------------
    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient funds")
            self._record("Failed Withdrawal", amount)
            return

        self.__balance -= amount
        self._record("Withdrawal", amount)

    # -------------------------------
    # 3️ Check balance
    # -------------------------------
    def check_balance(self):
        return f"Current balance: ₹{self.__balance}"

    # -------------------------------
    # Bonus: Save transaction history
    # -------------------------------
    def _record(self, action, amount):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.transactions.append({
            "action": action,
            "amount": amount,
            "time": timestamp
        })

    def show_history(self):
        print("\nTransaction History:")
        for t in self.transactions:
            print(f"{t['time']} — {t['action']}: ₹{t['amount']}")


# --------------------------------------
# Practice Execution
# --------------------------------------

acc = BankAccount("Parvesh", 5000)

acc.deposit(1500)
acc.withdraw(3000)
acc.withdraw(4000)   # insufficient funds
print(acc.check_balance())

# Show history
acc.show_history()
