package com.provider_service.provider_service.service;

import com.provider_service.provider_service.entity.Provider;
import com.provider_service.provider_service.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    @Autowired
    private ProviderRepository providerRepository;

    public Provider createProvider(Provider provider) {
        return providerRepository.save(provider);
    }

    public Provider getProviderById(int id) {
        return providerRepository.findById(id).orElse(null);
    }

    public Provider getProviderByUsername(String username) {
        return providerRepository.findByUsername(username);
    }

    public List<Provider> getProviderByServiceId(int id) {
        return providerRepository.findByServiceId(id);
    }

}
