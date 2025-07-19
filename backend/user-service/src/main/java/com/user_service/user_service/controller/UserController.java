package com.user_service.user_service.controller;

import com.user_service.user_service.entity.Client;
import com.user_service.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createClient")
    public Client createClient(@RequestBody Client client) {
        return userService.createClient(client);
    }

    @GetMapping("/getClient/{username}")
    public Client getClientByUsername(@PathVariable("username") String username) {
        return userService.getClientByUsername(username);
    }

}
