package com.agular.hello.exceptions;

public class BookAlreadyExistsException extends RuntimeException{

    public BookAlreadyExistsException(Long bookId){
        super("Book is already in library.");
    }
}
