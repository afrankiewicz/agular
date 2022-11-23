package com.agular.hello.web;

import com.agular.hello.entity.User;
import com.agular.hello.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {

    UserService userService;

//    @PostMapping
//    public ResponseEntity<User> addUser(@RequestBody User user){
//        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
//    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody User user){
//        userService.addUser(user);
        return userService.addUser(user);
    }


}
