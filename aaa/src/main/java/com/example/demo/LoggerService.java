package com.example.demo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class LoggerService {
    private static final Logger logger = LoggerFactory.getLogger(LoggerService.class);

    public static void logMessage(String message) {
        logger.info(message);
    }
}
