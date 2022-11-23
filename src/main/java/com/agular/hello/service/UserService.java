package com.agular.hello.service;

import com.agular.hello.entity.User;
import com.agular.hello.exceptions.BadRequestException;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private BookRepository bookRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Optional<User> getUser(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User addUser(User user){
        if (userRepository.existsByEmail(user.getEmail())){
            throw new BadRequestException(String.format("User with email: '%s' already exists.", user.getEmail()));
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

}
