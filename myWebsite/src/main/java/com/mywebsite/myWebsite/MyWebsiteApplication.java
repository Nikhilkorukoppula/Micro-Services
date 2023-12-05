package com.mywebsite.myWebsite;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories("com.mywebsite.myWebsite.repository")
public class MyWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyWebsiteApplication.class, args);
		
		 Runtime.getRuntime().addShutdownHook(new Thread(() -> {
	            System.out.println("Shutting down application...");
	        }));
	}

}
