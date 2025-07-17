package com.admin_service.admin_service.service;

import com.admin_service.admin_service.entity.Services;
import com.admin_service.admin_service.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private ServiceRepository serviceRepository;

    public Services createService(Services service) {
        return serviceRepository.save(service);
    }

    public List<Services> getAllService() {
        return serviceRepository.findAll();
    }

}
