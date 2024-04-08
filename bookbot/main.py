def main():
    print("--- Begin report of books/frankenstein.txt ---")
    book_content = get_content()
    
    words_count = count_words(book_content)
    ocurrences = get_letter_ocurrences(book_content)
    ocurrences_sorted = dict(sorted(ocurrences.items(), key=lambda item: item[1], reverse=True))

    print(f"{words_count} words found in the document")

    for letter, count in ocurrences_sorted.items():
        print(f"The '{letter}' character was found {count} times")
    
    print("--- End report ---")

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
