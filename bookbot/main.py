def main():
    book_content = get_content()
    words = count_words(book_content)
    print(words)

def get_content():
    with open('./books/frankenstein.txt') as f:
        content = f.read()
        return content

def count_words(book):
    words = book.split()
    words_count = len(words)
    return words_count

main()
