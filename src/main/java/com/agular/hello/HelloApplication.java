package com.agular.hello;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class HelloApplication {

	@Autowired
	UserRepository userRepository;
	@Autowired
	BookRepository bookRepository;

	public static void main(String[] args) {
		SpringApplication.run(HelloApplication.class, args);
	}

	@PostConstruct
	void insert() {
		User user1 = userRepository.save(new User("agata", "fran", "agata.fran@gmail.pl"));
		User user2 = userRepository.save(new User("mati", "kacz", "mati.kacz@gmail.pl"));
		Book book = new Book("123-123", "The Land of Laughs", "Jonathan Carroll", "EN");
		book.setBorrower(user2);
		bookRepository.save(book);
	}

}
