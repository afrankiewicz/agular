package com.agular.hello.service;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.exceptions.BadRequestException;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    BookRepository bookRepository;
    UserRepository userRepository;

    public BookService(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public Book registerBook(Book book, String email){
        User user = userRepository.findByEmail(email).get();
        book.setOwner(user);

        if (bookRepository.existsByIsbn(book.getIsbn())){
            throw new BadRequestException(String.format("Book with ISBN: '%s' already exists in library.", book.getIsbn()));
        }
        return bookRepository.save(book);
    }

    public Book borrowBook(Long bookId, String email){
        Book book = bookRepository.findById(bookId).get();
        User user = userRepository.findByEmail(email).get();

        if (book.getBorrower() != null){
            throw new BadRequestException("Book is already borrowed.");
        } else if (book.getOwner().getEmail() == email) {
            throw new BadRequestException("Book belongs to you.");
        }
        book.setBorrower(user);
        return bookRepository.save(book);
    }

    public Book returnBook(Long bookId, String email){
        Book book = bookRepository.findById(bookId).get();

        if (book.getBorrower() != null){
            if (book.getBorrower().getEmail() != email){
                throw new BadRequestException("Book is not borrowed by you.");
            }
        } else {
            throw new BadRequestException("Book is not borrowed by you.");
        }

        book.setBorrower(null);
        return bookRepository.save(book);
    }

    public List<Book> getOwned(String email){
        User user = userRepository.findByEmail(email).get();
        return bookRepository.getBooksByOwner(user);
    }

    public List<Book> getBorrowed(String email){
        User user = userRepository.findByEmail(email).get();
        return bookRepository.getBooksByBorrower(user);
    }

    public List<Book> getAll(){
        return (List<Book>) bookRepository.findAll();
    }

}
