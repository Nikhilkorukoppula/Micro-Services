package com.authentication.Authentication.Service;

import com.authentication.Authentication.entities.LoginDetails;
import com.authentication.Authentication.repository.LoginRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.thymeleaf.TemplateEngine;


@Service
public class ServiceClass {

    @Autowired
    private LoginRepository repo;

    @Autowired
    private JavaMailSender javaMailSender;




    public String sendMail(String email,String subject,String body){
        LoginDetails details=this.repo.findByEmail(email);
        if(details!=null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject(subject);
            message.setText(body);
            javaMailSender.send(message);
            return "mail sent successfully";
        }
            else{
            throw new RuntimeException("Please provide correct emailId");
        }

    }



    public void forgotPassword(String email,String resetUrl){
        LoginDetails details=this.repo.findByEmail(email);
        if(details!=null){
            SimpleMailMessage message=new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Forgot-password-mail");
            message.setText(resetUrl);
            javaMailSender.send(message);
        }
        else{
            throw new RuntimeException("Please provide correct emailId");
        }

    }

    public void sendAttachments(String email, String subject, String body, byte[] attachmentData, String attachmentName) throws MessagingException {
        LoginDetails details=this.repo.findByEmail(email);
        if(details!=null) {
            MimeMessage mail = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setText(body);

            ByteArrayResource resource = new ByteArrayResource(attachmentData);
            helper.addAttachment(attachmentName, resource);
            javaMailSender.send(mail);
        }
        else{
            throw new RuntimeException("Please provide correct emailId");
        }
    }
}
