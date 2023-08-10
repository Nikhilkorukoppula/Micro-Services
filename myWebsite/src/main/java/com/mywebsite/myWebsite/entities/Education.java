package com.mywebsite.myWebsite.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
//@Document(collection = "education")      
public class Education {

    @Transient
    public static final String SEQUENCE_NAME = "my_profile_sequence";
    
    private String educationType;
    private String institute;
    private int yearOfPass;
    private String percentage;
    private String stream;
    private String boardOfInstitute;
	
    
}
