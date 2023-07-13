package com.mywebsite.myWebsite.repository;

import com.mywebsite.myWebsite.entities.MyProfile;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableMongoRepositories
@ComponentScan
public interface MyProfileRepository extends MongoRepository<MyProfile, Integer> {
	
	public MyProfile findByName(String name);



    public MyProfile getByName(String name);
    MyProfile findByEmailAndPassword(String email, String password);
    //
    Optional<MyProfile> findByEmail(String email);

    @Query("{ 'email' : ?0 }")
    MyProfile getByEmail(String email);

    List<MyProfile> findAllByEmail(String email);
}
