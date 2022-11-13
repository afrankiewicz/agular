package com.agular.hello.web;

import com.agular.hello.entity.Book;
import com.agular.hello.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/book")
public class BookController {

    BookService bookService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<Book> registerBook(@RequestBody Book book, @PathVariable Long userId){
        return new ResponseEntity<>(bookService.registerBook(book, userId), HttpStatus.CREATED);
    }

    @PutMapping("{bookId}/user/{userId}/borrow")
    public ResponseEntity<Book> borrowBookByUser(@PathVariable Long bookId, @PathVariable Long userId){
        return new ResponseEntity<>(bookService.borrowBook(bookId, userId), HttpStatus.OK);
    }

    @PutMapping("{bookId}/user/{userId}/return")
    public ResponseEntity<Book> returnBookByUser(@PathVariable Long bookId, @PathVariable Long userId){
        return new ResponseEntity<>(bookService.returnBook(bookId, userId), HttpStatus.OK);
    }
}
