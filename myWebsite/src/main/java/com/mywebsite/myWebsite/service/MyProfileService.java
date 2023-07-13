package com.mywebsite.myWebsite.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.*;


import com.mywebsite.myWebsite.entities.Sequence;
import com.mywebsite.myWebsite.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mywebsite.myWebsite.dto.MyProfileDto;
import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.repository.MyProfileRepository;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class MyProfileService {


	Map<String,Object>map=new HashMap<>();

	@Autowired
	private MyProfileRepository myProfileRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Value("${files.storage}")
	public String folderLocation;



	@Autowired
	private JavaMailSender javaMailSender;


  private final MongoOperations mongoOperations;

	public MyProfileService( MongoOperations mongoOperations) {
		this.mongoOperations = mongoOperations;
	}

	public int getNextSequence() {
		Query query = new Query(where("_id").is(MyProfile.SEQUENCE_NAME));
		Update update = new Update().inc("sequenceValue", 1);
		FindAndModifyOptions options = options().returnNew(true).upsert(true);

		Sequence sequence = mongoOperations.findAndModify(query, update, options, Sequence.class);
		Assert.notNull(sequence, "Unable to get sequence value for key: " + MyProfile.SEQUENCE_NAME);

		return sequence.getSequenceValue();
	}

	public ResponseEntity<Map<String,Object>> forgotMail(String email,String resetUrl){
		MyProfile myProfile=this.myProfileRepository.getByEmail(email);
		if(myProfile!=null){
			SimpleMailMessage message=new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("Forgot-password-mail");
			message.setText(resetUrl);
			javaMailSender.send(message);
			map.put("message", "Mail Sent Successfully");
			map.put("status", HttpStatus.OK.value());
		}
		else{
			map.put("message", "Email Not Found");
			map.put("status", HttpStatus.NOT_FOUND.value());
			throw new NullPointerException("Please provide correct emailId");
		}
		return ResponseEntity.ok(map);
	}

	public ResponseEntity<Map<String,Object>> add(MyProfile myProfile){
        myProfile.setId(getNextSequence());
		myProfile.setPassword(encoder.encode(myProfile.getPassword()));
		this.myProfileRepository.save(myProfile);
			map.put("message", "submitted");
			map.put("status", HttpStatus.OK.value());

		return ResponseEntity.ok(map);
	}



	public ResponseEntity<Map<String,Object>> getAll(String email){
		List<MyProfile> myProfiles=this.myProfileRepository.findAllByEmail(email);
		List<MyProfileDto>list=new ArrayList<>();
		myProfiles.forEach(myprofile ->{
			MyProfileDto  dto=new MyProfileDto();
			dto.setName(myprofile.getName());
			dto.setEmail(myprofile.getEmail());
			dto.setGender(myprofile.getGender());
			dto.setAddress(myprofile.getAddress());
			dto.setDescription(myprofile.getDescription());
			dto.setDateOfBirth(String.valueOf(myprofile.getDateOfBirth()));
			dto.setContactNo(myprofile.getContactNo());

			list.add(dto);
		});


		map.put("message", "submitted");
		map.put("result", list);
		map.put("status", HttpStatus.OK.value());
		return ResponseEntity.ok(map);
	}


	public ResponseEntity<Map<String,Object>> getAllDetails(){
		List<MyProfile> myProfiles=this.myProfileRepository.findAll();
		List<MyProfileDto>list=new ArrayList<>();
		myProfiles.forEach(myprofile ->{
			MyProfileDto  dto=new MyProfileDto();
			dto.setName(myprofile.getName());
			dto.setEmail(myprofile.getEmail());
			dto.setGender(myprofile.getGender());
			dto.setAddress(myprofile.getAddress());
			dto.setDescription(myprofile.getDescription());
			dto.setDateOfBirth(String.valueOf(myprofile.getDateOfBirth()));
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

	public ResponseEntity<Map<String, Object>> update(String email, MyProfile description){
		MyProfile byEmail = this.myProfileRepository.getByEmail(email);
		if(email!=null) {
			byEmail.setDescription(description.getDescription());
			this.myProfileRepository.save(byEmail);
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

	public ResponseEntity<Map<String,Object>> getDesc(String email){
		MyProfile myProfile=myProfileRepository.getByEmail(email);
		map.put("result",myProfile.getDescription());
		map.put("message", " Data Found");
		map.put("status", HttpStatus.OK.value());
		return ResponseEntity.ok(map);
	}

}
