package com.authentication.Authentication.controller;

import com.authentication.Authentication.Service.ServiceClass;
import com.authentication.Authentication.dto.EmailDto;
import com.authentication.Authentication.entities.LoginDetails;
import com.authentication.Authentication.repository.LoginRepository;
import com.authentication.Authentication.token.JavaToken;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.print.DocFlavor;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

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

    @Autowired
    private ServiceClass serviceClass;



    @PostMapping("sendMails")
    public String sendAttachments(@RequestParam String email,
                                  @RequestParam String subject,
                                  @RequestParam String body,
                                  @RequestParam("file") MultipartFile file) throws IOException, MessagingException {
        if(file.isEmpty()||file==null){
            this.serviceClass.sendMail(email,subject,body);
            return "Mail sent successfully";
        }
        else{
            byte[] attachmentData = file.getBytes();
            String attachmentName = file.getOriginalFilename();
            this.serviceClass.sendAttachments(email,subject,body,attachmentData,attachmentName);
            return "Mail sent successfully with attachments";
        }

    }

    @PostMapping("/forgot-mail")
    public String forgotMail(@RequestBody LoginDetails details) {
        if(StringUtils.isEmpty(details.getEmail())){
            return "please provide your mailId";
        }
        else{

        /*  LoginDetails details1=new LoginDetails(details.getEmail());
          String baseUrl="http://localhost:8010/Security/resetPassword";
          serviceClass.forgotPassword(details.getEmail(),baseUrl);*/
            String password= UUID.randomUUID().toString().substring(0, 8);
            System.out.println(password);
            serviceClass.forgotPassword(details.getEmail(), password);
        }
        return "sent successfully";
    }

    @PutMapping("resetPassword")
    public String update(@RequestBody LoginDetails loginDetails){
        LoginDetails details=new LoginDetails();
        details.setPassword(loginDetails.getPassword());
        return "Updated";
    }

}
