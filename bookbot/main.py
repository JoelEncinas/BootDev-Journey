def main():
    book_content = get_content()
    words = count_words(book_content)
    print(words)

def get_content():
    with open('./books/frankenstein.txt') as f:
       return f.read().lower()

def count_words(book):
    words = book.split()
    words_count = len(words)
    return words_count

def get_a(book):
    words = book.split()
    # for word in words_


main()
