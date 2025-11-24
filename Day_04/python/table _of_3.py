def filter_numbers(numbers):
    result = []       
    for num in numbers:
        if num % 3 == 0:
            result.append(num)
    
    return result


input_list = [1, 3, 6, 7, 9, 12, 14]
output_list = filter_numbers(input_list)

print(output_list)
