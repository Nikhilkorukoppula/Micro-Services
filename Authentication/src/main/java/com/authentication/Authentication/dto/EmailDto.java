package com.authentication.Authentication.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EmailDto {

    @NotNull(message = "Please provide email..")
    private String email;
    @NotNull(message = "Please mention subject")
    private String subject;
    private String body;
}
