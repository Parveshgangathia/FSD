import argparse

def main():
    parser = argparse.ArgumentParser(
        description="Simple CLI Calculator"
    )

    # Positional arguments
    parser.add_argument("a", type=float, help="First number")
    parser.add_argument("b", type=float, help="Second number")

    # Optional argument
    parser.add_argument(
        "--op",
        choices=["add", "sub", "mul", "div"],
        default="add",
        help="Operation to perform"
    )

    args = parser.parse_args()

    try:
        if args.op == "add":
            result = args.a + args.b
        elif args.op == "sub":
            result = args.a - args.b
        elif args.op == "mul":
            result = args.a * args.b
        elif args.op == "div":
            if args.b == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = args.a / args.b

        print("Result:", result)

    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    main()
