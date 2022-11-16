package com.agular.hello.service;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.exceptions.BookAlreadyBorrowedException;
import com.agular.hello.exceptions.BookAlreadyExistsException;
import com.agular.hello.exceptions.BookNotFoundInUserLibraryException;
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

        if (bookRepository.existsByIsbn(book.getIsbn())){
            throw new BookAlreadyExistsException(book.getId());
        }
        return bookRepository.save(book);
    }

    public Book borrowBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();
        User user = userRepository.findById(userId).get();

        if (book.getBorrower().getId() != null){
            throw new BookAlreadyBorrowedException(bookId);
        }
        book.setBorrower(user);
        return bookRepository.save(book);
    }

    public Book returnBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();

        if (book.getBorrower().getId() != userId){
            throw new BookNotFoundInUserLibraryException(bookId);
        }
        book.setBorrower(null);
        return bookRepository.save(book);
    }



}
