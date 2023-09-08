package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @GetMapping("/")
    public String showForm(Model model) {
        model.addAttribute("user", new User());
        LoggerService.logMessage("Hi ");
        return "index";
    }

    @GetMapping("/greet")
    public String greet(User user) {
        LoggerService.logMessage("Hi " + user.getUsername());
        return "greet";
    }
}
