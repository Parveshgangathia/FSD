import bcrypt

# User registers
password = b"mypassword"
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

print("Stored hash:", hashed)

# User logs in
input_password = input("Enter password: ").encode()

if bcrypt.checkpw(input_password, hashed):
    print("Login successful")
else:
    print("Wrong password")
