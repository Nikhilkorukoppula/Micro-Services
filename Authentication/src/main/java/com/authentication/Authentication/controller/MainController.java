package com.authentication.Authentication.controller;

import com.authentication.Authentication.entities.LoginDetails;
import com.authentication.Authentication.repository.LoginRepository;
import com.authentication.Authentication.token.JavaToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Security")
public class MainController {

    @Autowired
    private JavaToken token;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private LoginRepository loginRepository;
    @PostMapping("/adding")
    public LoginDetails loginAdd(@RequestBody LoginDetails login) {
        login.setPassword(encoder.encode(login.getPassword()));
        return loginRepository.save(login);
    }

    @GetMapping("/getAll")
    public List<LoginDetails> getAll(){
        return loginRepository.findAll();
    }

    @GetMapping("/validate")
    public String validate(@RequestParam("token") String validToken){

         token.validateToken(validToken);
         return "Valid Token";
    }

    @PostMapping("/auth")
    public String get(@RequestBody LoginDetails details) {
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(details.getUserName(), details.getPassword()));

        if(authentication.isAuthenticated()) {
            return token.token(details.getUserName());
        }
        else {
            throw new BadCredentialsException("Invalid user and password");
        }
    }
}
