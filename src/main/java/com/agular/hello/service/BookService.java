package com.agular.hello.service;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.exceptions.BadRequestException;
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
            throw new BadRequestException(String.format("Book with ISBN: '%s' already exists in library.", book.getIsbn()));
        }
        return bookRepository.save(book);
    }

    public Book borrowBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();
        User user = userRepository.findById(userId).get();

        if (book.getBorrower() != null){
            throw new BadRequestException("Book is already borrowed.");
        } else if (book.getOwner().getId() == userId) {
            throw new BadRequestException("Book belongs to you.");
        }
        book.setBorrower(user);
        return bookRepository.save(book);
    }

    public Book returnBook(Long bookId, Long userId){
        Book book = bookRepository.findById(bookId).get();

        if (book.getBorrower() != null){
            if (book.getBorrower().getId() != userId){
                throw new BadRequestException("Book is not borrowed by you.");
            }
        } else {
            throw new BadRequestException("Book is not borrowed by you.");
        }

        book.setBorrower(null);
        return bookRepository.save(book);
    }



}
