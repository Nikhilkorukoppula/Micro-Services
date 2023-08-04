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
@Document(collection = "education")
public class Education {

    @Transient
    public static final String SEQUENCE_NAME = "my_profile_sequence";

    @Id
    private int educationId;
    private long profileId;
    private String educationType;
    private String institute;
    private int yearOfPass;
    private String percentage;
    private String stream;
    private String boardOfInstitute;
	public int getEducationId() {
		return educationId;
	}
	public void setEducationId(int educationId) {
		this.educationId = educationId;
	}
	public long getProfileId() {
		return profileId;
	}
	public void setProfileId(long profileId) {
		this.profileId = profileId;
	}
	public String getEducationType() {
		return educationType;
	}
	public void setEducationType(String educationType) {
		this.educationType = educationType;
	}
	public String getInstitute() {
		return institute;
	}
	public void setInstitute(String institute) {
		this.institute = institute;
	}
	public int getYearOfPass() {
		return yearOfPass;
	}
	public void setYearOfPass(int yearOfPass) {
		this.yearOfPass = yearOfPass;
	}
	public String getPercentage() {
		return percentage;
	}
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}
	public String getStream() {
		return stream;
	}
	public void setStream(String stream) {
		this.stream = stream;
	}
	public String getBoardOfInstitute() {
		return boardOfInstitute;
	}
	public void setBoardOfInstitute(String boardOfInstitute) {
		this.boardOfInstitute = boardOfInstitute;
	}
	public static String getSequenceName() {
		return SEQUENCE_NAME;
	}

    
}
