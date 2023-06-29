package com.mywebsite.myWebsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywebsite.myWebsite.entities.MyProfile;

public interface MyProfileRepository extends JpaRepository<MyProfile, Integer>{
	
	public MyProfile findByName(String name);

    MyProfile findByEmailAndPassword(String email, String password);


}
