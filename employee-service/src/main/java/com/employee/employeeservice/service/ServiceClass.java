package com.employee.employeeservice.service;

import com.employee.employeeservice.config.WebClientConfig;
import com.employee.employeeservice.entities.Order;
import com.employee.employeeservice.repository.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceClass {

    @Autowired
    private WebClient webClient;
    @Autowired
    private Repo repo;

    public String add(Order order){
        String oname=order.getName();
    String name=webClient.get().uri("http://DEPARTMENT/product/getByName?name="+oname)
                 .retrieve().bodyToMono(String.class).block();
    if(name!=null){
        repo.save(order);
    }
    else{
        throw new NullPointerException("product is not in stock");
    }
     return "order placed";
    }
    public List<Order> getAll(){

        return repo.findAll();
    }
}
