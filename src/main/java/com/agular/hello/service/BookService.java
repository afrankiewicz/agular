package com.agular.hello.service;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BookService {

    BookRepository bookRepository;
    UserRepository userRepository;

    public Book registerBook(Book book, Long userId){
        User user = userRepository.findById(userId).get();
        book.setOwner(user);
        return bookRepository.save(book);
    }

    public Book borrowBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();
        User user = userRepository.findById(userId).get();

        if (book.getBorrower().getId() == null) {
            book.setBorrower(user);
        } else {
            System.out.println("Can't borrow the book -> book is already borrowed");
        }

        return bookRepository.save(book);
    }

    public Book returnBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();
        User user = userRepository.findById(userId).get();

        if (book.getBorrower().getId() == userId){
            book.setBorrower(null);
        } else {
            System.out.println("Can't return the book -> book is not borrowed by you");
        }

        return bookRepository.save(book);
    }



}
