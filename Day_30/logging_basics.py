import logging

# --------------------------------------------------
# Configuration
# --------------------------------------------------

DEBUG = True
LOG_FILE = "app.log"

logging.basicConfig(
    level=logging.DEBUG if DEBUG else logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename=LOG_FILE,
    filemode="a"  # append mode
)

# --------------------------------------------------
# Application logic
# --------------------------------------------------

def divide(a, b):
    return a / b

def main():
    logging.info("App started")

    try:
        logging.info("Attempting division")
        result = divide(10, 0)
        logging.info(f"Result: {result}")

    except Exception as e:
        logging.error("An error occurred", exc_info=True)

    finally:
        logging.info("App finished")

if __name__ == "__main__":
    main()
