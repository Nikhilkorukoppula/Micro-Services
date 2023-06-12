package com.authentication.Authentication.security;

import com.authentication.Authentication.token.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
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

import java.util.Properties;

@Configuration
@EnableMethodSecurity
@EnableWebMvc
public class SecurityClass {

    @Autowired
    private JwtFilter authFilter;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return  http.csrf()
                .ignoringRequestMatchers("/Security/sendAttachments") // Exclude your multipart endpoint from CSRF protection
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/Security/adding","/Security/auth","/Security/validate","/Security/forgot-mail","/Security/resetPassword")
                .permitAll()
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
    static PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService detailsService() {

        return new LoginDetailsService();
    }



    @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();

   }

    @Bean
    public AuthenticationProvider provider() {
        DaoAuthenticationProvider dao=new DaoAuthenticationProvider ();
        dao.setUserDetailsService(detailsService());
        dao.setPasswordEncoder(encoder());
        return dao;
    }


}
