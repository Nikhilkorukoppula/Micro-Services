package com.mywebsite.myWebsite.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.service.MyProfileService;
//sdfjkghydfjcvdgyeruifgv
@RestController
@RequestMapping("api/V1/myprofile")
public class MyProfileController {
	
	@Autowired
	private MyProfileService myProfileService;
	
	@PostMapping("add")
	public ResponseEntity<Map<String,Object>> add(@RequestBody MyProfile myProfile){
		return myProfileService.add(myProfile);
	}
	
	@GetMapping("getDescription")
	public ResponseEntity<Map<String,Object>> getDesc(){
		return myProfileService.getDesc();
	}
	
	@GetMapping("getAll")
	public ResponseEntity<Map<String,Object>> getAll(){
		return myProfileService.getAll();
	}

}
