package com.apigateway.apigateway.filter;

import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {
    public static final List<String> endPoints=List.of(
            "/eureka",
            "/Security/adding",
            "/Security/auth",
            "/Security/validate"
    );

    public Predicate<ServerHttpRequest>isSecured= request->
        endPoints.stream().noneMatch(uri->request.getURI().getPath().contains(uri));

}
