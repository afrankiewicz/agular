package com.agular.hello.repositiry;

import com.agular.hello.entity.Book;
import com.agular.hello.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    boolean existsByIsbn(String isbn);
    List<Book> getBooksByOwner(User user);
    List<Book> getBooksByBorrower(User user);

}
