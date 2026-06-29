package com.demo.service;

import com.demo.repository.BookRepository;

public class BookService {

    private BookRepository bookRepository;

    // Setter Method
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void showBooks() {
        System.out.println("Library Management System");
        bookRepository.displayBooks();
    }
}