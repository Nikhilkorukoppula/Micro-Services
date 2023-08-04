package com.mywebsite.myWebsite.controller;


import com.mywebsite.myWebsite.entities.Education;
import com.mywebsite.myWebsite.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/education")
public class EducationController {

    @Autowired
    private EducationService service;

    @PostMapping("insert")
    public Map<String,Object>insert(Education education){
        return this.service.insert(education);
    }
}
