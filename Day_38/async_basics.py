"""
ASYNC BASICS — SINGLE FILE PRACTICE

This file demonstrates:
1. Sequential execution (blocking)
2. Concurrent execution (async / await)
3. Time comparison

Run:
python async_basics_all_in_one.py
"""

import time
import asyncio


# -------------------------------------------------
# PART 1: Sequential (blocking) execution
# -------------------------------------------------

def blocking_task(name, delay):
    time.sleep(delay)
    print(f"{name} done (blocking)")


def run_sequential():
    print("\n--- Sequential Execution ---")
    start = time.time()

    blocking_task("A", 1)
    blocking_task("B", 2)
    blocking_task("C", 3)

    print("Sequential time:", time.time() - start)


# -------------------------------------------------
# PART 2: Async (concurrent) execution
# -------------------------------------------------

async def async_task(name, delay):
    await asyncio.sleep(delay)
    print(f"{name} done (async)")


async def run_concurrent():
    print("\n--- Concurrent Execution ---")
    start = time.time()

    await asyncio.gather(
        async_task("A", 1),
        async_task("B", 2),
        async_task("C", 3),
    )

    print("Async time:", time.time() - start)


# -------------------------------------------------
# MAIN
# -------------------------------------------------

if __name__ == "__main__":
    run_sequential()
    asyncio.run(run_concurrent())
