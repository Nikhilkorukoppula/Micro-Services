package com.employee.employeeservice.controller;


import com.employee.employeeservice.entities.Order;

import com.employee.employeeservice.service.ServiceClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders/")
public class ControllerClass {

    @Autowired
    private ServiceClass service;

    @GetMapping("get")
    public List<Order> get(){
        return service.getAll();
    }

    @PostMapping("add")
    public String add(@RequestBody Order order){
        return service.add(order);
    }


}
