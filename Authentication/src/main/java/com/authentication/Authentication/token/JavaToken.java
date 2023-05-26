package com.authentication.Authentication.token;


import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.security.core.userdetails.UserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
@Component
public class JavaToken {
    public static final String NIKHIl="6562326453343435434563452345123156435184153781545143";
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSecurityKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public void validateToken(String token)
    {
        Jwts.parser().setSigningKey(NIKHIl).parseClaimsJws(token).getBody();
    }
    public String token(String userName) {
        Map<String,Object>claims=new HashMap<>();
        return createToken(claims,userName); }

    private String createToken(Map<String, Object> claims, String userName) {

        return Jwts.builder().setClaims(claims) .setSubject(userName).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(getSecurityKey(),SignatureAlgorithm.HS256) .compact();
    }

    private Key getSecurityKey() {
        byte[] key=Decoders.BASE64.decode(NIKHIl);
        return Keys.hmacShaKeyFor(key);
    }



}
