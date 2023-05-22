package com.employee.employeeservice.repository;
import com.employee.employeeservice.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo extends JpaRepository<Order,Long> {


}
