package com.auth_service.auth_service.service;

import com.auth_service.auth_service.model.Role;
import com.auth_service.auth_service.model.Users;
import com.auth_service.auth_service.repo.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    ApplicationContext context;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.CLIENT); // Set default role
        }

        return userRepo.save(user);
    }

    public String extractRole(String token) {
        return jwtService.extractRole(token);
    }

    public String verify(Users user) {

        Authentication authentication = authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return jwtService.generateToken(userDetails);
        }

        return "fail";
    }

    public boolean validate(String token) {

        String username = null;

        if (token != null) {
            username = jwtService.extractUserName(token);
        }

        if (username != null) {

            UserDetails userDetails = context.getBean(
                    MyUserDetailsService.class).loadUserByUsername(username);

            if (jwtService.validateToken(token, userDetails)) {
                return true;
            }
        }

        return false;
    }

}
