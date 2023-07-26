package com.mywebsite.myWebsite.security;


import com.mywebsite.myWebsite.security.token.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@EnableMethodSecurity
@Configuration
@EnableWebMvc
public class SecurityClass {


    @Autowired
    private JwtFilter authFilter;

     @Bean
     SecurityFilterChain http(HttpSecurity httpSecurity) throws Exception{
         return httpSecurity.csrf().disable().cors().configurationSource(corsConfigurationSource()).and()
                 .authorizeHttpRequests()
                 .requestMatchers("api/V1/myprofile/login","api/V1/myprofile/add","api/V1/myprofile/forgot-mail","api/V1/myprofile/getPic/**").permitAll()
                 .anyRequest()
                 .authenticated()
                 .and().sessionManagement()
                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                 .and()
                 .authenticationProvider(provider())
                 .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                 .build();
     }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // Allow requests from all origins
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE","OPTIONS")); // Allowed HTTP methods
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allowed
//	configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply the configuration to all paths
        return source;
    }



    @Bean
    public AuthenticationProvider provider(){
         DaoAuthenticationProvider dao=new DaoAuthenticationProvider ();
         dao.setUserDetailsService(detailsService());
         dao.setPasswordEncoder(encoder());
        System.out.println("4th step");
         return dao;
    }

    @Bean
    public PasswordEncoder encoder(){
         return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService detailsService(){
        System.out.println("initialized");
         return new LoginDetailsService();
    }

    @Bean
    public AuthenticationManager manager(AuthenticationConfiguration configuration) throws Exception {
        System.out.println("3rd step");
        return configuration.getAuthenticationManager();
    }
}
