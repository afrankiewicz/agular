package com.agular.hello;

import com.agular.hello.entity.User;
import com.agular.hello.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@SpringBootTest
@RunWith(SpringRunner.class)
class HelloApplicationTests {

	@Autowired
	UserService userService;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@Test
	void shouldAddUser() {
		String rawPassword = "qwe123";
		User user = userService.addUser(new User("Jan", "Kowalski","jkowalski@wp.pl", rawPassword, "Sportowa", "Warszawa"));
		Optional<User> optionalUser = userService.getUser(user.getId());

		Assert.assertTrue(optionalUser.isPresent());
		User testUser = optionalUser.get();
		Assert.assertEquals(user.getFirstName(),testUser.getFirstName());
		Assert.assertEquals(user.getLastName(),testUser.getLastName());
		Assert.assertEquals(user.getEmail(),testUser.getEmail());
		Assert.assertTrue(bCryptPasswordEncoder.matches(rawPassword, testUser.getPassword()));
	}

	@Test
	void shouldNotAddUserAlreadyExists(){
		User user = userService.addUser(new User("Jan", "Kowalski","jkowalski@wp.pl", "qwe123", "Sportowa", "Warszawa"));
		userService.addUser(user);


	}

}
