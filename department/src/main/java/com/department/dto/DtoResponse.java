package com.department.dto;


import lombok.Data;

@Data
public class DtoResponse {

    private long id;
    private String name;
    private String description;
    private long price;
}
