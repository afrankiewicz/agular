package com.agular.hello;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import com.agular.hello.repositiry.BookRepository;
import com.agular.hello.repositiry.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
		User user1 = userRepository.save(new User("Agata", "Kowalska", "agata.kowalska@gmail.com", new BCryptPasswordEncoder().encode("123"), "Szewska", "Wrocław"));
		User user2 = userRepository.save(new User("Mateusz", "Nowak", "mat.nowak@gmail.com", new BCryptPasswordEncoder().encode("456"), "Marszałkowska", "Warszawa"));
		Book book = new Book("978-83-89405-00-5", "The Land of Laughs", "Jonathan Carroll", "EN");
		Book book2 = new Book("978-83-7432-357-4", "Norwegian Wood", "Haruki Murakami", "EN");
		Book book3 = new Book("978-83-6532-456-1", "Harry Potter and the Deathly Hallows", "J.K. Rowling", "EN");
		Book book4 = new Book("978-83-7432-222-3", "In Search of Lost Time", "Marcel Proust", "EN");
		Book book5 = new Book("978-83-7432-2346-4", "Moby Dick", "Herman Melville", "EN");
		Book book6 = new Book("978-83-3452-12-1", "War and Peace", "Leo Tolstoy", "EN");
		Book book7 = new Book("978-83-3452-2387-1", "The Odyssey", "Homer", "EN");
		Book book8 = new Book("978-83-3452-568-3", "Madame Bovary", "Gustave Flaubert", "EN");
		Book book9 = new Book("978-83-67-5765-3", "The Adventures of Huckleberry Finn", "Mark Twain", "EN");
		Book book10 = new Book("978-83-76432-4774-4", "Alice's Adventures in Wonderland", "Lewis Carroll", "EN");
		Book book11 = new Book("978-83-76432-532-3", " The Iliad", "Homer", "EN");
		Book book12 = new Book("978-83-76432-45-3", "To the Lighthouse", "Virginia Woolf", "EN");
		Book book13 = new Book("978-83-456-43-3", "Heart of Darkness", "Joseph Conrad", "EN");
		Book book14 = new Book("978-83-456-651-2", "The Sound and the Fury", "William Faulkner", "EN");
		Book book15 = new Book("978-83-3452-8762-1", "To Kill a Mockingbird", "Harper Lee", "EN");

		book.setOwner(user1);
		book2.setOwner(user2);
		book3.setOwner(user1);
		book4.setOwner(user1);
		book5.setOwner(user1);
		book6.setOwner(user1);
		book7.setOwner(user2);
		book8.setOwner(user2);
		book9.setOwner(user2);
		book10.setOwner(user2);
		book11.setOwner(user2);
		book12.setOwner(user2);
		book13.setOwner(user2);
		book14.setOwner(user2);
		book15.setOwner(user2);
		book14.setBorrower(user1);
		book15.setBorrower(user1);
		bookRepository.save(book);
		bookRepository.save(book2);
		bookRepository.save(book3);
		bookRepository.save(book4);
		bookRepository.save(book5);
		bookRepository.save(book6);
		bookRepository.save(book7);
		bookRepository.save(book8);
		bookRepository.save(book9);
		bookRepository.save(book10);
		bookRepository.save(book11);
		bookRepository.save(book12);
		bookRepository.save(book13);
		bookRepository.save(book14);
		bookRepository.save(book15);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
