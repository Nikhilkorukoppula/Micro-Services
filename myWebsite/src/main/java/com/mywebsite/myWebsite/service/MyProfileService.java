package com.mywebsite.myWebsite.service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.nio.file.attribute.FileAttribute;
import java.util.*;
import java.util.concurrent.ForkJoinPool;


import com.mywebsite.myWebsite.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.mywebsite.myWebsite.dto.MyProfileDto;
import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.repository.MyProfileRepository;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MyProfileService {
	Map<String,Object>map=new HashMap<>();

	@Autowired
	private MyProfileRepository myProfileRepository;

	@Value("${files.storage}")
	public String folderLocation;

	//private final Path root = Paths.get(folderLocation);


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
			dto.setGender(myprofile.getGender());
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

	public ResponseEntity<Map<String,Object>> login(String email,String password) throws UserNotFoundException {
		MyProfile profile = this.myProfileRepository.findByEmailAndPassword(email, password);
		if (profile != null) {
			map.put("message", "Login success");
			map.put("status", HttpStatus.OK.value());
		} else {
			throw new UserNotFoundException("User Not Found");

		}
		return ResponseEntity.ok(map);

	}


	public ResponseEntity<Map<String,Object>>  uploadPic(MultipartFile file,String name) {
		MyProfile myProfile=myProfileRepository.findByName(name);
		if(myProfile!=null) {
			String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
			System.out.println(fileExtension);
			List<String> extensions = new ArrayList<>();
			extensions.add("jpg");
			extensions.add("jpeg");
			extensions.add("png");
			try {
				if (!extensions.contains(fileExtension)) {
					map.put("message", "error");
					map.put("status", HttpStatus.BAD_REQUEST.value());

					throw new RuntimeException("please provide valid image");
				}
				else{
					String fileName = name+".jpg";
					Files.copy(file.getInputStream(),
							Paths.get(folderLocation).resolve(fileName),StandardCopyOption.REPLACE_EXISTING);
					myProfile.setProfile(fileName);
					this.myProfileRepository.save(myProfile);
					map.put("message", "ProfilePic Uploaded successfully");
					map.put("status", HttpStatus.OK.value());

				}
			}
			 catch (IOException e) {
				 System.out.println("exception occurred");
				 if (e instanceof FileAlreadyExistsException) {
					 throw new RuntimeException("A file of that name already exists.");
				 }
				 throw new RuntimeException(e.getMessage());
			}


		}
		else{
			map.put("message", "error");
			map.put("status", HttpStatus.BAD_REQUEST.value());
			throw  new NullPointerException("User not found");
		}
		return ResponseEntity.ok(map);
	}

	public Resource getPic(String name){
		MyProfile myProfile=myProfileRepository.findByName(name);
		String fileName=myProfile.getProfile();
		try {
			Path file = Paths.get(folderLocation).resolve(fileName);
			Resource resource =  new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("Could not read the file!");
			}
		}
		catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}
	}
}
