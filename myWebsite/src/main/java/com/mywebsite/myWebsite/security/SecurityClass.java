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
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableMethodSecurity
@Configuration
@EnableWebMvc
public class SecurityClass {


    @Autowired
    private JwtFilter authFilter;

     @Bean
     SecurityFilterChain http(HttpSecurity httpSecurity) throws Exception{
         return httpSecurity.csrf().disable()
                 .authorizeHttpRequests()
                 .requestMatchers("").permitAll()
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
    public AuthenticationProvider provider(){
         DaoAuthenticationProvider dao=new DaoAuthenticationProvider ();
         dao.setUserDetailsService(detailsService());
         dao.setPasswordEncoder(encoder());
         return dao;
    }

    @Bean
    public PasswordEncoder encoder(){
         return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService detailsService(){
         return new LoginDetailsService();
    }

    @Bean
    public AuthenticationManager manager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
