"""
PYTHON PROFILING BASICS — SINGLE FILE PRACTICE

This file demonstrates:
1. Manual timing with time.time()
2. Comparing two functions
3. Profiling with cProfile
4. Understanding where code is slow

Run:
python profiling_all_in_one.py
"""

import time
import cProfile


# -------------------------------------------------
# PART 1: Basic manual timing
# -------------------------------------------------

def slow():
    time.sleep(0.2)


def manual_timing_demo():
    print("\n--- Manual Timing Demo ---")

    start = time.time()
    for _ in range(5):
        slow()
    end = time.time()

    print("Elapsed time (manual):", end - start)


# -------------------------------------------------
# PART 2: Compare two functions
# -------------------------------------------------

def fast():
    time.sleep(0.05)


def comparison_demo():
    print("\n--- Function Comparison Demo ---")

    start = time.time()
    for _ in range(5):
        slow()
    print("Slow elapsed:", time.time() - start)

    start = time.time()
    for _ in range(5):
        fast()
    print("Fast elapsed:", time.time() - start)


# -------------------------------------------------
# PART 3: Profiling with cProfile
# -------------------------------------------------

def profiling_target():
    for _ in range(5):
        slow()
    for _ in range(5):
        fast()


def cprofile_demo():
    print("\n--- cProfile Demo ---")
    print("Profiling function execution...\n")

    cProfile.run("profiling_target()")


# -------------------------------------------------
# MAIN EXECUTION
# -------------------------------------------------

if __name__ == "__main__":
    manual_timing_demo()
    comparison_demo()
    cprofile_demo()
