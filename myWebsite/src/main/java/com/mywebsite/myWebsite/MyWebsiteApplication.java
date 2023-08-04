package com.mywebsite.myWebsite;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class MyWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyWebsiteApplication.class, args);
		
		 Runtime.getRuntime().addShutdownHook(new Thread(() -> {
	            System.out.println("Shutting down application...");
	        }));
	}

}
