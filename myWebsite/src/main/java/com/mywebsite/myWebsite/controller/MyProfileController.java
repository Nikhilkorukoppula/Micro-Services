package com.mywebsite.myWebsite.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.mywebsite.myWebsite.exception.UserNotFoundException;
import com.mywebsite.myWebsite.security.token.JavaToken;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JavaToken token;
	
	@PostMapping("add")
	public ResponseEntity<Map<String,Object>> add(@RequestBody MyProfile myProfile){
		return myProfileService.add(myProfile);
	}

	@PostMapping("login")
	public ResponseEntity<Map<String,Object>> login(@RequestBody MyProfile myProfile) throws UserNotFoundException {
		System.out.println("email "+myProfile.getEmail()+" password "+myProfile.getPassword());
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(myProfile.getEmail(), myProfile.getPassword()));
		System.out.println(authentication);
		if(authentication.isAuthenticated()) {
			String token1 = token.token(myProfile.getEmail());
			System.out.println("passed");
			Map<String, Object> map = new HashMap<>();
			map.put("Token", token1);
			map.put("token expiryTime", this.token.extractExpiration(token1));
			map.put("token expiry Date", this.token.isTokenExpired(String.valueOf(token1)));
			map.put("message", "success");
			map.put("status", HttpStatus.OK.value());
			map.put("username",myProfile.getEmail());

			return ResponseEntity.ok().body(map);
		}
		else {
			throw new BadCredentialsException("Invalid user and password");
		}

	}

	@PutMapping("uploadPic/{email}")
	public ResponseEntity<Map<String, Object>> uploadPic(@PathVariable("email") String email,
														 @RequestParam("file")MultipartFile file) throws IOException {
		return myProfileService.uploadPic(email,file);
	}

	@GetMapping("getPic/{email}")
	public byte[] getPic(@PathVariable("email") String email) throws IOException {
		return myProfileService.getPic(email);
	}
	@PutMapping("update/{email}")
	public ResponseEntity<Map<String,Object>> update(@PathVariable("email") String email,
													 @RequestBody MyProfile description){
		return myProfileService.update(email,description);
	}

	@GetMapping("getAll/{email}")
	public ResponseEntity<Map<String,Object>> getAll(@PathVariable("email") String mail){

		return myProfileService.getAll(mail);
	}

	@GetMapping("getAllDetails")
	public ResponseEntity<Map<String,Object>> getAllDetails(){

		return myProfileService.getAllDetails();
	}

	@GetMapping("getDesc/{email}")
	public ResponseEntity<Map<String,Object>> getDesc(@PathVariable("email") String email){

		return myProfileService.getDesc(email);
	}


	@PostMapping("/forgot-mail")
	public ResponseEntity<Map<String,Object>> forgotMail(@RequestBody MyProfile myProfile) {
		if(StringUtils.isEmpty(myProfile.getEmail())){
			Map<String,Object>map=new HashMap<>();
			map.put("message", "please provide your mailId");
			map.put("status", HttpStatus.NOT_FOUND.value());
			return ResponseEntity.ok(map);
		}
		else{

          MyProfile details1=new MyProfile();
          String baseUrl="http://localhost:3000/resetPassword";
         return myProfileService.forgotMail(myProfile.getEmail(),baseUrl);
		}
	}


}
