a = [1, 2, 3, 2, 4, 3, 5, 1]

def remove_duplicate(number):
    unique_list = []
    for a in number:
        if a not in unique_list:
            unique_list.append(a)
    return unique_list

result = remove_duplicate(a)
print(result)