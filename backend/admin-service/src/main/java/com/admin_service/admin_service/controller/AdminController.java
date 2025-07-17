package com.admin_service.admin_service.controller;

import com.admin_service.admin_service.entity.Services;
import com.admin_service.admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/createService")
    public Services createService(@RequestBody Services service) {
        return adminService.createService(service);
    }

    @GetMapping("/getAllService")
    public List<Services> getAllService() {
        return adminService.getAllService();
    }

}
