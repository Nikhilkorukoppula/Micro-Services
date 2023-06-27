package com.mywebsite.myWebsite.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.service.MyProfileService;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("api/V1/myprofile")
@CrossOrigin(origins = "*")
public class MyProfileController {
	
	@Autowired
	private MyProfileService myProfileService;
	
	@PostMapping("add")
	public ResponseEntity<Map<String,Object>> add(@RequestBody MyProfile myProfile){
		return myProfileService.add(myProfile);
	}

	@PostMapping("login")
	public ResponseEntity<Map<String,Object>> login(@RequestParam String email,@RequestParam String password){
		return myProfileService.login(email,password);
	}

	@PostMapping("uploadPic")
	public String uploadPic(@RequestParam("file")MultipartFile file){
		return myProfileService.uploadPic(file);
	}
	@PutMapping("update")
	public ResponseEntity<Map<String,Object>> update(@RequestParam String name,
													 @RequestParam String description){
		return myProfileService.update(name,description);
	}

	@GetMapping("getAll")
	public ResponseEntity<Map<String,Object>> getAll(){
		return myProfileService.getAll();
	}

}
