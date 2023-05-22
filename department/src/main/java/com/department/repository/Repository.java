package com.department.repository;
import com.department.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface Repository extends JpaRepository<Product, Long> {
    public Product findByName(String name);

}
