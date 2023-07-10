package com.mywebsite.myWebsite;

import com.mywebsite.myWebsite.repository.MyProfileRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = {MongoAutoConfiguration.class})
//@EnableMongoRepositories(basePackageClasses = MyProfileRepository.class)
public class MyWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyWebsiteApplication.class, args);
	}

}
