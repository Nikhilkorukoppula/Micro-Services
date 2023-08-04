package com.mywebsite.myWebsite.service;

import com.mywebsite.myWebsite.entities.Education;
import com.mywebsite.myWebsite.repository.EducationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EducationService {

    @Autowired
    private EducationRepo repo;
    Map<String,Object>map=new HashMap<>();
    public Map<String,Object> insert(Education education){

        try{
            this.repo.save(education);
            map.put("message","inserted");
            map.put("code", HttpStatus.OK.value());
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return map;
    }
}
