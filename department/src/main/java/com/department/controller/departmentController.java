package com.department.controller;


import com.department.entities.Department;
import com.department.repository.DepartmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class departmentController {

    @Autowired
    private DepartmentRepo departmentRepo;

    @GetMapping("get/{id}")
    public Department get(@PathVariable("id") Long id){
        return departmentRepo.findById(id);
    }

    @PostMapping("add")
    public Department add(@RequestBody Department department){
        return departmentRepo.add(department);
    }
}
