package com.agular.hello;

import com.agular.hello.entity.User;
import com.agular.hello.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

//@SpringBootTest
//@RunWith(SpringRunner.class)
public class BookServiceTest {

    @Autowired
    UserService userService;

    @Test
    public void shouldAddUser() {
        User user = userService.addUser(new User("q", "w","eee@wp.pl", "r", "k", "k"));
        Optional<User> optionalUser = userService.getUser(user.getId());

        Assert.assertTrue(optionalUser.isPresent());
    }

}
