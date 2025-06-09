package com.project.back_end.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.back_end.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Find a patient by their email address
    Optional<Patient> findByEmail(String email);

    // Find a patient using either their email or phone number
    Optional<Patient> findByEmailOrPhone(String email, String phone);
}
