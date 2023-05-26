package com.apigateway.apigateway.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    public static final String NIKHIl="6562326453343435434563452345123156435184153781545143";

    public void validateToken(String token)
    {
        Jwts.parser().setSigningKey(NIKHIl).parseClaimsJws(token).getBody();
    }
    private Key getSecurityKey() {
        byte[] key= Decoders.BASE64.decode(NIKHIl);
        return Keys.hmacShaKeyFor(key);
    }
}
