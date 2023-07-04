package com.mywebsite.myWebsite.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ProblemDetailsClass {

    @ExceptionHandler({UserNotFoundException.class})
    public ProblemDetail handleInvalidArgument(UserNotFoundException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        problemDetail.setProperty("Message", ex.getMessage());
        problemDetail.setStatus(HttpStatus.NOT_FOUND);
        problemDetail.setType(URI.create("Error"));

        return problemDetail;
    }

}
