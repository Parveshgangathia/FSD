def split_even_odd(numbers):
    evens = []
    odds = []
    
    for num in numbers:
        if num % 2 == 0:
            evens.append(num)
        else:
            odds.append(num)
    
    return evens, odds



nums = [1, 2, 3, 4, 5, 6, 7]
even_list, odd_list = split_even_odd(nums)

print("Even numbers:", even_list)
print("Odd numbers:", odd_list)
