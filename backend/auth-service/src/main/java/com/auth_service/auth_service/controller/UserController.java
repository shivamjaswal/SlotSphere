package com.auth_service.auth_service.controller;

import com.auth_service.auth_service.model.Role;
import com.auth_service.auth_service.model.Users;
import com.auth_service.auth_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return userService.verify(user);
    }

    @GetMapping("/getRole/{token}")
    public String extractRole(@PathVariable("token") String token) {
        return userService.extractRole(token);
    }

    @GetMapping("/validate/{token}")
    public boolean validate(@PathVariable("token") String token) {
        return userService.validate(token);
    }

}
