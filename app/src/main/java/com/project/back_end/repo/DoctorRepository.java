package com.project.back_end.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.back_end.models.Doctor;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

   // Find a doctor by their email address
   Optional<Doctor> findByEmail(String email);

   // Find doctors by partial name match (case-sensitive by default)
   @Query("SELECT d FROM Doctor d WHERE d.name LIKE CONCAT('%', :name, '%')")
   List<Doctor> findByNameLike(String name);

   // Filter doctors by partial name and exact specialty (both case-insensitive)
   @Query("SELECT d FROM Doctor d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%')) AND LOWER(d.specialty) = LOWER(:specialty)")
   List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(String name, String specialty);

   // Find doctors by specialty (case-insensitive)
   List<Doctor> findBySpecialtyIgnoreCase(String specialty);
}
