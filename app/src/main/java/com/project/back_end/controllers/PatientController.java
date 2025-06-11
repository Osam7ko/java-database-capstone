package com.project.back_end.controllers;

import com.project.back_end.models.Patient;
import com.project.back_end.DTO.Login;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.AuthenticationService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;
    private final AuthenticationService service;

    @Autowired
    public PatientController(PatientService patientService, AuthenticationService service) {
        this.patientService = patientService;
        this.service = service;
    }

    // 1. Get Patient Details
    @GetMapping("/{token}")
    public ResponseEntity<Map<String, Object>> getPatient(@PathVariable String token) {
        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "patient");
        if (!validation.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> error = new HashMap<>(validation.getBody());
            return new ResponseEntity<>(error, validation.getStatusCode());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("patient", patientService.getPatientDetails(token));
        return ResponseEntity.ok(response);
    }

    // 2. Create a New Patient
    @PostMapping
    public ResponseEntity<Map<String, String>> createPatient(@RequestBody @Valid Patient patient) {
        return patientService.createPatient(patient);
    }

    // 3. Patient Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid Login login) {
        return service.validatePatientLogin(login);
    }

    // 4. Get Patient Appointments
    @GetMapping("/{id}/{token}")
    public ResponseEntity<Map<String, Object>> getPatientAppointment(
            @PathVariable Long id,
            @PathVariable String token) {

        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "patient");
        if (!validation.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> error = new HashMap<>(validation.getBody());
            return new ResponseEntity<>(error, validation.getStatusCode());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("appointments", patientService.getPatientAppointment(id, token)); // ← أضف التوكن
        return ResponseEntity.ok(response);
    }

    // 5. Filter Patient Appointments
    @GetMapping("/filter/{condition}/{name}/{token}")
    public ResponseEntity<Map<String, Object>> filterPatientAppointment(
            @PathVariable String condition,
            @PathVariable String name,
            @PathVariable String token) {

        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "patient");
        if (!validation.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> error = new HashMap<>(validation.getBody());
            return new ResponseEntity<>(error, validation.getStatusCode());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("appointments", service.filterPatient(condition, name, token));
        return ResponseEntity.ok(response);
    }
}
