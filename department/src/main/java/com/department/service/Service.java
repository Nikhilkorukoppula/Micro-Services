package com.department.service;

import com.department.dto.Dto;
import com.department.dto.DtoResponse;
import com.department.entities.Product;
import com.department.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class Service {

   @Autowired
   private Repository repo;

    public Product add(Dto product){
        Product p=new Product();
        p.setName(product.getName());
        p.setDescription(product.getDescription());
        p.setPrice(product.getPrice());
        repo.save(p);
        return p;
    }
    public List<DtoResponse> getAll(){
       List<Product>products= repo.findAll();
        List<DtoResponse> list=new ArrayList<>();
      products.forEach(
              product -> {
                  DtoResponse response=new DtoResponse();
                  response.setId(product.getId());
                  response.setName(product.getName());
                  response.setDescription(product.getDescription());
                  response.setPrice(product.getPrice());
                  list.add(response);
              }
      );
         return list; 

    }

    public Product findByName(String name){
      return  repo.findByName(name);
    }
}
