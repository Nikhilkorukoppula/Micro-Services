package com.mywebsite.myWebsite.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mywebsite.myWebsite.dto.MyProfileDto;
import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.repository.MyProfileRepository;

@Service
public class MyProfileService {
	Map<String,Object>map=new HashMap<>();

	@Autowired
	private MyProfileRepository myProfileRepository;

	public ResponseEntity<Map<String,Object>> add(MyProfile myProfile){
		this.myProfileRepository.save(myProfile);
		map.put("message", "submitted");
		map.put("status", HttpStatus.OK.value());
		return ResponseEntity.ok(map);
	}

	public ResponseEntity<Map<String,Object>> update(String  name,String description){
		MyProfile byName = this.myProfileRepository.findByName(name);
		if(name!=null) {
			byName.setDescription(description);
			this.myProfileRepository.save(byName);
			map.put("message", "updated");
			map.put("status", HttpStatus.OK.value());
		}
		else {
			map.put("message", "No Data Found");
			map.put("status", HttpStatus.NOT_FOUND.value());
			throw new NullPointerException("no data found");

		}
		return ResponseEntity.ok(map);
	}

	public ResponseEntity<Map<String,Object>> getAll(){
		List<MyProfile> myProfiles=this.myProfileRepository.findAll();
		List<MyProfileDto>list=new ArrayList<>();
		myProfiles.forEach(myprofile ->{
			MyProfileDto  dto=new MyProfileDto();
			dto.setName(myprofile.getName());
			dto.setEmail(myprofile.getEmail());
			dto.setAge(myprofile.getAge());
			dto.setAddress(myprofile.getAddress());
			dto.setDescription(myprofile.getDescription());
			dto.setDateOfBirth(myprofile.getDateOfBirth());
			dto.setContactNo(myprofile.getContactNo());
			list.add(dto);
		});


		map.put("message", "submitted");
		map.put("result", list);
		map.put("status", HttpStatus.OK.value());
		return ResponseEntity.ok(map);
	}

}
