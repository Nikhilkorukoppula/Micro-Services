package com.mywebsite.myWebsite.dto;



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
	private String dateOfBirth;
	private String gender;
	private long contactNo;
	private String address;

	

}
