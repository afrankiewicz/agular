package com.agular.hello.exceptions;

public class BookNotFoundInUserLibraryException extends RuntimeException{

    public BookNotFoundInUserLibraryException(Long bookId){
        super("Book is not borrowed by you.");
    }
}
