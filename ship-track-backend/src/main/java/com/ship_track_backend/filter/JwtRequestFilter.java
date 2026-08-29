//package com.ship_track_backend.filter;
//import java.io.IOException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//
//import io.jsonwebtoken.Claims;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//@Component
//public class JwtRequestFilter extends OncePerRequestFilter {
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {
//
//        String authHeaderString = request.getHeader("Authorization");
//
//        // ✅ Bug 1 Fixed — Null check
//        if (authHeaderString != null && authHeaderString.startsWith("Bearer ")) {
//
//            String jwtTokenString = authHeaderString.substring(7);
//
//            Boolean isTokenValidBoolean = jwtService.verifyJwtToken(jwtTokenString);
//
//            if (isTokenValidBoolean) {
//                Claims claims = jwtService.getJwtClaims(jwtTokenString);
//                String email = claims.getSubject();
//                String role  = claims.get("role", String.class);
//
//                UserDetails userDetails = User.builder()
//                        .username(email)
//                        .password("")
//                        .roles(role)
//                        .build();
//                UsernamePasswordAuthenticationToken authenticationToken =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails, null, userDetails.getAuthorities());
//                authenticationToken.setDetails(
//                        new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//            }
//        }
//
//        // ✅ Bug 3 Fixed — Always continue to controller
//        filterChain.doFilter(request, response);
//    }
//}
