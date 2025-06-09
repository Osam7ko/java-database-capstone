package com.project.back_end.controllers;

import com.project.back_end.models.Prescription;
import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.AuthenticationService;
import com.project.back_end.services.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${api.path}prescription")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final AuthenticationService service;
    private final AppointmentService appointmentService;

    @Autowired
    public PrescriptionController(
            PrescriptionService prescriptionService,
            AuthenticationService service,
            AppointmentService appointmentService) {
        this.prescriptionService = prescriptionService;
        this.service = service;
        this.appointmentService = appointmentService;
    }

    // 1. Save Prescription
    @PostMapping("/{token}")
    public ResponseEntity<Map<String, String>> savePrescription(
            @RequestBody @Valid Prescription prescription,
            @PathVariable String token) {

        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "doctor");
        if (!validation.getStatusCode().is2xxSuccessful()) {
            return validation;
        }

        ResponseEntity<Map<String, String>> result = prescriptionService.savePrescription(prescription);

        if (result.getStatusCode().is2xxSuccessful()) {
            appointmentService.markPrescriptionAdded(prescription.getAppointmentId());
        }

        return result;
    }

    // 2. Get Prescription by Appointment ID
    @GetMapping("/{appointmentId}/{token}")
    public ResponseEntity<Map<String, Object>> getPrescription(
            @PathVariable Long appointmentId,
            @PathVariable String token) {

        ResponseEntity<Map<String, String>> validation = service.validateToken(token, "doctor");
        if (!validation.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> error = new HashMap<>(validation.getBody());
            return new ResponseEntity<>(error, validation.getStatusCode());
        }
        return prescriptionService.getPrescription(appointmentId);
    }

}
