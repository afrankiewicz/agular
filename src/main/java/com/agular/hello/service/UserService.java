package com.agular.hello.service;

import com.agular.hello.entity.User;
import com.agular.hello.exceptions.UserAlreadyExistsException;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {

    UserRepository userRepository;
    BookRepository bookRepository;

    public User getUser(Long id){
        return userRepository.findById(id).get();
    }

    public User addUser(User user){
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getId());
        }
        return userRepository.save(user);
    }

}
