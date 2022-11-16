package com.agular.hello.exceptions;

public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(Long userId){
        super("User already exists.");
    }
}
