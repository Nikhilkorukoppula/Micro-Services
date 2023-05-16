package com.department.repository;

import com.department.entities.Department;
import org.apache.catalina.LifecycleState;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DepartmentRepo {


    List<Department>departments=new ArrayList<>();

    public Department add(Department department){
         departments.add(department);
        return department;
    }
 public Department findById(Long id){
        return departments.stream().filter(department ->  department.getId().equals(id)).findFirst().orElseThrow();

 }
}
