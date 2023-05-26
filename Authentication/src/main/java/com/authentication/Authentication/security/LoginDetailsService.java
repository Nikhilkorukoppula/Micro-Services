package com.authentication.Authentication.security;

import com.authentication.Authentication.entities.LoginDetails;
import com.authentication.Authentication.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class LoginDetailsService implements UserDetailsService {
    @Autowired
    private LoginRepository repo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<LoginDetails> details=repo.findByUserName(username);
        return details.map(LoginDetailsConfig::new).orElseThrow(()-> new UsernameNotFoundException("user not found"));
    }

}
