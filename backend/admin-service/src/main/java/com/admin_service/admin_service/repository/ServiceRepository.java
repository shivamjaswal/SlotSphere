package com.admin_service.admin_service.repository;

import com.admin_service.admin_service.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Services, Integer> {

}
