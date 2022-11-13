package com.agular.hello.repositiry;

import com.agular.hello.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
}
