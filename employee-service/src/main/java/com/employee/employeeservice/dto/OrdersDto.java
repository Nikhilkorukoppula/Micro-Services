package com.employee.employeeservice.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDto {

    private  Long id;
    private String OrderDetails;
    private String orderName;
    private long price;
    private String description;

}
