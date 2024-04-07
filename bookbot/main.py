def main():
    book_content = get_content()
    ocurrences = get_letter_ocurrences(book_content)
    print(ocurrences)

def get_content():
    with open('./books/frankenstein.txt') as f:
       return f.read().lower()

def count_words(book):
    words = book.split()
    words_count = len(words)
    return words_count

def get_letter_ocurrences(book):
    letter_counts = {}

    for char in book:
        if char.isalpha(): 
            if char in letter_counts:
                letter_counts[char] += 1  
            else:
                letter_counts[char] = 1 
    
    return letter_counts

main()
