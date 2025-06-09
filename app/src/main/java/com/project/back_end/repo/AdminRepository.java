package com.project.back_end.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back_end.models.Admin;

/**
 * Repository interface for Admin entity.
 * Provides basic CRUD operations and custom query to find by username.
 */
@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Custom query method to find an Admin by username
    Optional<Admin> findByUsername(String username);
}
