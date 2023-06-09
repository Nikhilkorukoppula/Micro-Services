package com.employee.employeeservice.service;

import com.employee.employeeservice.dto.OrdersDto;
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
        String name = webClient.get().uri("http://DEPARTMENT/product/getByName?name=" + oname)
                .retrieve().bodyToMono(String.class).block();
        if(name!=null){
        repo.save(order);
    }
    else{
        throw new NullPointerException("product is not in stock");
    }
     return "order placed";
    }



    public List<OrdersDto> getAll(){

        List<Order> list = repo.findAll();
        List<OrdersDto>orders=new ArrayList<>();
        for(Order o:list){
            OrdersDto dto=new OrdersDto();
            dto.setId(o.getId());
            dto.setOrderName(o.getName());
            dto.setOrderDetails(o.getOderDetails());
            OrdersDto n =webClient.get().uri("http://DEPARTMENT/product/getByName?name="+o.getName()).retrieve().bodyToMono(OrdersDto.class).block();
            dto.setPrice(n.getPrice());
            dto.setDescription(n.getDescription());
            orders.add(dto);
        }
         return orders;
    }
}
