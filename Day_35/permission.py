import logging

permissions = {
    "admin": ["read", "write", "delete"],
    "user": ["read"]
}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="access.log"
)

def can_access(user_role, action):
    return action in permissions.get(user_role, [])

def check_permission(user_role, action):
    if not can_access(user_role, action):
        raise PermissionError(
            f"Access denied: {user_role} cannot {action}"
        )
    return True

def secure_action(user_role, action):
    try:
        check_permission(user_role, action)
        logging.info(f"{user_role} performed {action}")
        print(f" {user_role} allowed to {action}")
    except PermissionError as e:
        logging.warning(str(e))
        print(f" {e}")

# Tests
print("\n--- Admin Tests ---")
secure_action("admin", "read")
secure_action("admin", "write")
secure_action("admin", "delete")

print("\n--- User Tests ---")
secure_action("user", "read")
secure_action("user", "write")
secure_action("user", "delete")
