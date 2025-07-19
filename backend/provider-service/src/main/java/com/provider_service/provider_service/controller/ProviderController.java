package com.provider_service.provider_service.controller;

import com.provider_service.provider_service.entity.Provider;
import com.provider_service.provider_service.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    @Autowired
    private ProviderService providerService;

    @PostMapping("/createProvider")
    public Provider createProvider(@RequestBody Provider provider) {
        return providerService.createProvider(provider);
    }

    @GetMapping("/getProviderById/{id}")
    public Provider getProviderById(@PathVariable("id") int id) {
        return providerService.getProviderById(id);
    }

    @GetMapping("/getProviderByUsername/{username}")
    public Provider getProviderByUsername(@PathVariable("username") String username) {
        return providerService.getProviderByUsername(username);
    }

    @GetMapping("/getProviderByServiceId/{serviceId}")
    public List<Provider> getProviderByServiceId(@PathVariable("serviceId") int serviceId) {
        return providerService.getProviderByServiceId(serviceId);
    }

}
