package com.employee.employeeservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;

public class Controllerclass2 {
    @Autowired
    private WebClient webClient;
    @GetMapping("get/{name}")
            public void get(@PathVariable("name")String name) {
        String s = webClient.get().uri("localhost:8008/product/getByName/" + name)
                .retrieve().bodyToMono(String.class).block();
    }
}
