package com.mywebsite.myWebsite.repository;

import com.mywebsite.myWebsite.entities.Education;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableMongoRepositories
@ComponentScan
public interface EducationRepo extends MongoRepository<Education,Integer> {
}
