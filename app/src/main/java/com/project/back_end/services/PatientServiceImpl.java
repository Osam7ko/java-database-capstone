package com.project.back_end.services;

import com.project.back_end.DTO.AppointmentDTO;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;

    @Override
    public ResponseEntity<Map<String, String>> createPatient(Patient patient) {
        Map<String, String> response = new HashMap<>();

        Optional<Patient> existingPatient = patientRepository.findByEmailOrPhone(patient.getEmail(),
                patient.getPhone());

        if (existingPatient.isPresent()) {
            response.put("message", "Patient with email or phone already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        try {
            patientRepository.save(patient);
            response.put("message", "Signup successful");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Internal server error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @Override
    public ResponseEntity<Map<String, Object>> getPatientAppointment(Long id, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = tokenService.extractEmail(token);
            Optional<Patient> optionalPatient = patientRepository.findById(id);

            if (optionalPatient.isEmpty() || !optionalPatient.get().getEmail().equals(email)) {
                response.put("message", "Unauthorized access");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }

            List<Appointment> appointments = appointmentRepository.findByPatientId(id);
            List<AppointmentDTO> dtos = appointments.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());

            response.put("appointments", dtos);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Internal Server Error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> filterByCondition(String condition, Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            int status = condition.equalsIgnoreCase("past") ? 1 : condition.equalsIgnoreCase("future") ? 0 : -1;
            if (status == -1) {
                response.put("message", "Invalid condition");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            List<Appointment> appointments = appointmentRepository
                    .findByPatient_IdAndStatusOrderByAppointmentTimeAsc(id, status);
            List<AppointmentDTO> dtos = appointments.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
            response.put("appointments", dtos);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Internal Server Error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> filterByDoctor(String name, Long patientId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Appointment> appointments = appointmentRepository
                    .filterByDoctorNameAndPatientId(name, patientId);
            List<AppointmentDTO> dtos = appointments.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
            response.put("appointments", dtos);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Internal Server Error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> filterByDoctorAndCondition(String condition, String name, long patientId) {
        Map<String, Object> response = new HashMap<>();
        try {
            int status = condition.equalsIgnoreCase("past") ? 1 : condition.equalsIgnoreCase("future") ? 0 : -1;
            if (status == -1) {
                response.put("message", "Invalid condition");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            List<Appointment> appointments = appointmentRepository
                    .filterByDoctorNameAndPatientIdAndStatus(name, patientId, status);
            List<AppointmentDTO> dtos = appointments.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
            response.put("appointments", dtos);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Internal Server Error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> getPatientDetails(String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            String email = tokenService.extractEmail(token);
            Optional<Patient> optionalPatient = patientRepository.findByEmail(email);

            if (optionalPatient.isEmpty()) {
                response.put("message", "Patient not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.put("patient", optionalPatient.get());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Internal Server Error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private AppointmentDTO toDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .doctorId(appointment.getDoctor().getId())
                .doctorName(appointment.getDoctor().getName())
                .patientId(appointment.getPatient().getId())
                .patientName(appointment.getPatient().getName())
                .patientEmail(appointment.getPatient().getEmail())
                .patientPhone(appointment.getPatient().getPhone())
                .patientAddress(appointment.getPatient().getAddress())
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .appointmentDate(appointment.getAppointmentDate())
                .appointmentTimeOnly(appointment.getAppointmentTimeOnly())
                .endTime(appointment.getEndTime())
                .build();
    }


}
