a = "Pravesh Kumar"

def count_vowels(text):
    vowels = "aeiouAEIOU"
    count_v = 0
    count_c = 0
    for b in text:
        if b in vowels:
            count_v += 1
        else:
            count_c += 1

    return count_v, count_c

constant, vowels = count_vowels(a)

print("Vowel count:", vowels)
print("Constant count:", constant)


        