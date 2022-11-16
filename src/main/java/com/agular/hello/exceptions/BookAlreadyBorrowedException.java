package com.agular.hello.exceptions;

public class BookAlreadyBorrowedException extends RuntimeException{

    public BookAlreadyBorrowedException(Long bookId){
        super("Book is already borrowed.");
    }
}
