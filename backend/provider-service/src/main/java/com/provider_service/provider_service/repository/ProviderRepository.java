package com.provider_service.provider_service.repository;

import com.provider_service.provider_service.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Integer> {

    Provider findByUsername(String username);
    List<Provider> findByServiceId(int id);

}
