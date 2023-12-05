package com.mywebsite.myWebsite.security;

import javax.security.sasl.AuthenticationException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.mywebsite.myWebsite.entities.MyProfile;

public class JavaTokenExtract {          
	
	
	public static SecurityConfig getCurrentUser() throws AuthenticationException {
		
	Authentication auth=SecurityContextHolder.getContext().getAuthentication();
	if(auth != null && auth.isAuthenticated()) {
		System.out.println(auth);
		Object principal = auth.getPrincipal();
		System.out.println(principal);
		if(principal != null) {
			SecurityConfig config = (SecurityConfig) principal;
			System.out.println(config);
			return config;
		}
		
	}
	throw new AuthenticationException("Session Exprired");
	}
}
