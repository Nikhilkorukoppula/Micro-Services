package com.employee.employeeservice.config;


import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration

public class WebClientConfig {

    @Bean
    @LoadBalanced
    public WebClient webClient(LoadBalancedExchangeFilterFunction loadBalancedExchangeFilterFunction) {

        return WebClient.builder().filter(loadBalancedExchangeFilterFunction).build();
    }
}
