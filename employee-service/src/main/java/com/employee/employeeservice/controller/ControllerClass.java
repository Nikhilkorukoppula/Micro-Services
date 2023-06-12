package com.employee.employeeservice.controller;


import com.employee.employeeservice.dto.OrdersDto;
import com.employee.employeeservice.entities.Order;

import com.employee.employeeservice.service.ServiceClass;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("orders/")
public class ControllerClass {

    @Autowired
    private ServiceClass service;

    @GetMapping("get")
    public List<OrdersDto> get(){
        return service.getAll();
    }

    int count =1;
    @PostMapping("add")
    //@CircuitBreaker(name="inventory",fallbackMethod = "fallbackMethod")
    @TimeLimiter(name="inventory")
    @Retry(name="inventory",fallbackMethod = "retryMethod")

    public CompletableFuture<String> add(@RequestBody Order order){
        System.out.println(count);
        count++;
        return CompletableFuture.supplyAsync(()->service.add(order));

    }
public CompletableFuture<String> fallbackMethod(Order order,RuntimeException runtimeException){
        return CompletableFuture.supplyAsync(()->"Oops! something went wrong");
}

public CompletableFuture<String> retryMethod(Order order,RuntimeException runtimeException ){
    return CompletableFuture.supplyAsync(()->"Retry after sometime..!");
}

}
