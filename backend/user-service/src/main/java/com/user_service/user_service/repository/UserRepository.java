package com.user_service.user_service.repository;

import com.user_service.user_service.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Client, Integer> {

    Client findClientByUsername(String username);

}
