a = [13, 7, 19, 5, 1, 10, 15, 2, 8, 17, 4, 12, 6, 20, 11, 9, 3, 16, 14, 18]

def even_numbers(numbers): 
    for item in numbers:
        if item % 2 == 0:
            print(item)

even_numbers(a)
                  