package com.department.controller;


import com.department.dto.Dto;
import com.department.dto.DtoResponse;
import com.department.entities.Product;
import com.department.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class Controller {

    @Autowired
    private Service service;

    @GetMapping("getAll")
    public List<DtoResponse> getAll(){

        return service.getAll();
    }

    @PostMapping("add")
    public Product add(@RequestBody Dto product){
        return service.add(product);
    }

    @GetMapping("/getByName")
    public Product getByName(@RequestParam("name")String name){
        return service.findByName(name);
    }
}
