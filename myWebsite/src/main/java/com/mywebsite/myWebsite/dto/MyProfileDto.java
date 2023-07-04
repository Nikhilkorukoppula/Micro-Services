package com.mywebsite.myWebsite.dto;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyProfileDto {

	private String name;
	private String email;
	private String description;
	private LocalDate dateOfBirth;
	private String gender;
	private long contactNo;
	private String address;

	

}
