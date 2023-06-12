package com.authentication.Authentication.Service;

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

    @Autowired
    private TemplateEngine engine;

    @Autowired
    private WebClient webClient;

    public String sendMail(String email,String subject,String body){
            SimpleMailMessage message=new SimpleMailMessage();
            message.setTo(email);
            message.setSubject(subject);
            message.setText(body);
            javaMailSender.send(message);
            return "mail sent successfully";

    }



    public String forgotPassword(String email,String resetUrl){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Forgot-password-mail");
        message.setText(resetUrl);
        javaMailSender.send(message);
        return "mail sent successfully";
    }

    public String sendAttachments(String email, String subject, String body, byte[] attachmentData, String attachmentName) throws MessagingException {
        MimeMessage mail=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mail,true);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(body);

        ByteArrayResource resource=new ByteArrayResource(attachmentData);
        helper.addAttachment(attachmentName,resource);
        javaMailSender.send(mail);
        return "mail sent successfully with attachments";
    }
}
