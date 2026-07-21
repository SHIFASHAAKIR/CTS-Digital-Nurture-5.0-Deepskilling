import java.util.Arrays;
import java.util.Comparator;
class Book {
    int bookId;
    String title;
    String author;
    public Book(int bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }
    @Override
    public String toString() {
        return "Book ID: " + bookId +
                ", Title: " + title +
                ", Author: " + author;
    }
}
public class LibraryManagementSystem {
    public static Book linearSearch(Book[] books, String targetTitle) {
        for (Book book : books) {
            if (book.title.equalsIgnoreCase(targetTitle)) {
                return book;
            }
        }
        return null;
    }
    public static Book binarySearch(Book[] books, String targetTitle) {
        int left = 0;
        int right = books.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            int comparison =
                    books[mid].title.compareToIgnoreCase(targetTitle);
            if (comparison == 0) {
                return books[mid];
            }
            if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }   
     public static void main(String[] args) {
        Book[] books = {
                new Book(101, "Java Programming", "James Gosling"),
                new Book(102, "Data Structures", "Mark Allen"),
                new Book(103, "Operating Systems", "Andrew Tanenbaum"),
                new Book(104, "Computer Networks", "Behrouz Forouzan"),
                new Book(105, "Database Systems", "Elmasri")
        };
        String searchTitle = "Data Structures";
        Book linearResult = linearSearch(books, searchTitle);
        System.out.println("Linear Search Result:");
        if (linearResult != null) {
            System.out.println(linearResult);
        } else {
            System.out.println("Book Not Found");
        }
        Arrays.sort(books,
                Comparator.comparing(book -> book.title.toLowerCase()));
        Book binaryResult = binarySearch(books, searchTitle);
        System.out.println("\nBinary Search Result:");
        if (binaryResult != null) {
            System.out.println(binaryResult);
        } else {
            System.out.println("Book Not Found");
        }
    }
}