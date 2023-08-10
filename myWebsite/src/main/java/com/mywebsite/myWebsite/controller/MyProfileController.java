package com.mywebsite.myWebsite.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.security.sasl.AuthenticationException;

import com.mywebsite.myWebsite.exception.UserNotFoundException;
import com.mywebsite.myWebsite.security.JavaTokenExtract;
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

import com.mywebsite.myWebsite.entities.Education;
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

	@PutMapping("uploadPic")
	public ResponseEntity<Map<String, Object>> uploadPic(@RequestParam("file")MultipartFile file) throws IOException {
		String email=JavaTokenExtract.getCurrentUser().getUsername();
		return myProfileService.uploadPic(email,file);
	}

	@GetMapping("getPic")
	public byte[] getPic() throws IOException {
		String email=JavaTokenExtract.getCurrentUser().getUsername();
		return myProfileService.getPic(email);
	}
	@PutMapping("update")
	public ResponseEntity<Map<String,Object>> update( @RequestBody MyProfile description) throws AuthenticationException{
		String email=JavaTokenExtract.getCurrentUser().getUsername();
		return myProfileService.update(email,description);
	}

	@GetMapping("getAll")
	public ResponseEntity<Map<String,Object>> getAll() throws AuthenticationException{
            String email=JavaTokenExtract.getCurrentUser().getUsername();
		return myProfileService.getAll(email);
	}

	@GetMapping("getAllDetails")
	public ResponseEntity<Map<String,Object>> getAllDetails(){

		return myProfileService.getAllDetails();
	}

	@GetMapping("getDesc")
	public ResponseEntity<Map<String,Object>> getDesc() throws AuthenticationException{
		 String email=JavaTokenExtract.getCurrentUser().getUsername();
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

     @PutMapping("update-education")
     public ResponseEntity<Map<String,Object>> updateEducation(@RequestBody List<Education>education) throws AuthenticationException{
    	String email=JavaTokenExtract.getCurrentUser().getUsername();
    	
    	 return  myProfileService.updateEducation(email,education);
     }
     
     @PutMapping("update-skills")
     public ResponseEntity<Map<String,Object>> updateSkills(@RequestBody List<String>skills) throws AuthenticationException{
    	String email=JavaTokenExtract.getCurrentUser().getUsername();
    	
    	 return  myProfileService.updateSkills(email,skills);
     }
     
     @PutMapping("update-experience")
     public ResponseEntity<Map<String,Object>> updateExperience(@RequestBody List<String>experience) throws AuthenticationException{
    	String email=JavaTokenExtract.getCurrentUser().getUsername();
    	
    	 return  myProfileService.updateExperience(email,experience);
     }
     @PutMapping("update-language")
     public ResponseEntity<Map<String,Object>> updateLanguages(@RequestBody List<String>language) throws AuthenticationException{
    	String email=JavaTokenExtract.getCurrentUser().getUsername();
    	
    	 return  myProfileService.updateLanguages(email,language);
     }
     
}
