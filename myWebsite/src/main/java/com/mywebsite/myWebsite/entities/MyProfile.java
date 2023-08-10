package com.mywebsite.myWebsite.entities;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "my_profile")
public class MyProfile {
	@Transient
	public static final String SEQUENCE_NAME = "my_profile_sequence";

	@Id
	private int id;
	private String name;
	private String description;
	private String email;
	private LocalDate dateOfBirth;
	private String gender;
	private long contactNo;
	private String address;
    private String password;
    private String profile;
	private List<Education> education=new ArrayList<Education>();
    private List<String>languages;
    private List<String> skills;
    private List<String>experience;
    
}
