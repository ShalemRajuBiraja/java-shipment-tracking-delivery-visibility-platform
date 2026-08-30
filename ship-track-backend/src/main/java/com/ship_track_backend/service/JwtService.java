package com.ship_track_backend.service;

import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.catalina.startup.UserDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ship_track_backend.entity.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;



@Service
public class JwtService {
	
	// 1. Import secret key and create security key
	// 2. Generate JWT token by using user details and security key
	
	@Value("${jwt.secret_key}")
	private String jwtsecretKey;
	
	public Key generateSecurityKey() {
		return Keys.hmacShaKeyFor(jwtsecretKey.getBytes());
	}
	
	
	
    public String generateJwtToken( UserEntity userData) {
    	
    	Date tokenGeneratedTimeDate = new Date();
    	Date tokenExpirationDate = new Date(
    		    tokenGeneratedTimeDate.getTime() + 
    		    7L * 24 * 60 * 60 * 1000
    		);    	
    	
    	
    	//jwt key creation
    	String jwtTokenString = Jwts.builder()
    	.claim("role", userData.getRole())
    	.subject(userData.getEmail())
    	.issuedAt(tokenGeneratedTimeDate)
    	.expiration(tokenExpirationDate)
    	.signWith(generateSecurityKey())
    	.compact();
    	
    	return jwtTokenString;
    }
    
    
    //checking validation of token
    /*
     * Try to get claims -> if success ok, else catch exception and return false or throw error
     * check if it not expired -> if expired return false or throw error 
     */
    public Claims getJwtClaims(String token) {
    	
    	SecretKey secretKey = new SecretKeySpec(jwtsecretKey.getBytes(), "HmacSHA256");
    	
    	Claims claims = Jwts.parser()
    				        .verifyWith(secretKey)
    				        .build()
    				        .parseSignedClaims(token)
    				        .getPayload();
    	return claims;
    }
    
    public boolean verifyJwtToken(String token) {
    	
        try {
            Claims claims = getJwtClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}
