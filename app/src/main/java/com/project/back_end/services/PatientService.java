package com.project.back_end.services;

import com.project.back_end.models.Patient;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface PatientService {

    ResponseEntity<Map<String, String>> createPatient(Patient patient);

    ResponseEntity<Map<String, Object>> getPatientAppointment(Long id, String token);

    ResponseEntity<Map<String, Object>> filterByCondition(String condition, Long id);

    ResponseEntity<Map<String, Object>> filterByDoctor(String name, Long patientId);

    ResponseEntity<Map<String, Object>> filterByDoctorAndCondition(String condition, String name, long patientId);

    ResponseEntity<Map<String, Object>> getPatientDetails(String token);
}
