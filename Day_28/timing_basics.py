import time
from datetime import datetime

# --------------------------------------------------
# 1. Measure execution time
# --------------------------------------------------

start = time.time()

# Sample work
total = 0
for i in range(1_000_000):
    total += i

elapsed = time.time() - start
print("Execution time (seconds):", round(elapsed, 4))


# --------------------------------------------------
# 2. Simple countdown using sleep (5 → 0)
# --------------------------------------------------

print("\nCountdown:")
for i in range(5, -1, -1):
    print(i)
    time.sleep(1)


# --------------------------------------------------
# 3. Retry logic with delay (simulate network retry)
# --------------------------------------------------

MAX_RETRIES = 3
DELAY_SECONDS = 2

print("\nRetry simulation:")

for attempt in range(1, MAX_RETRIES + 1):
    print(f"Attempt {attempt} at {datetime.now()}")

    # Simulate failure for first two attempts
    if attempt < 3:
        print("Failed. Retrying...")
        time.sleep(DELAY_SECONDS)
    else:
        print("Success!")
        break


# --------------------------------------------------
# 4. Timestamped logging
# --------------------------------------------------

def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")

print("\nTimestamped logs:")
log("Script started")
time.sleep(1)
log("Processing data")
time.sleep(1)
log("Script finished")


# --------------------------------------------------
# 5. BONUS: Run every 2 seconds for 10 seconds total
# --------------------------------------------------

print("\nScheduled loop (every 2 seconds for 10 seconds):")

start_time = time.time()
DURATION = 10
INTERVAL = 2

while time.time() - start_time < DURATION:
    log("Scheduled task running")
    time.sleep(INTERVAL)

print("Scheduled task completed")
