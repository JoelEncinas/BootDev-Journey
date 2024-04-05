def main():
    print(open_book())

def open_book():
    with open('./books/frankenstein.txt') as f:
        content = f.read()
        return content

main()
