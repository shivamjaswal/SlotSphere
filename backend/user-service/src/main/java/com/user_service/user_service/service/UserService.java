package com.user_service.user_service.service;

import com.user_service.user_service.entity.Client;
import com.user_service.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Client createClient(Client client) {
        return userRepository.save(client);
    }

    public Client getClientByUsername(String username) {
        return userRepository.findClientByUsername(username);
    }

}
