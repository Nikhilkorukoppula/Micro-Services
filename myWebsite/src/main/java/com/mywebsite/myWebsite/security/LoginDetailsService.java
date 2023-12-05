package com.mywebsite.myWebsite.security;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mywebsite.myWebsite.entities.MyProfile;
import com.mywebsite.myWebsite.repository.MyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class LoginDetailsService implements UserDetailsService {

    @Autowired
    private MyProfileRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<MyProfile> profile=repo.findByEmail(username);
        return profile.map(SecurityConfig::new).orElseThrow(()-> new UsernameNotFoundException("user not found"));

    }

}
