package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull(message = "Doctor must be assigned")
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @NotNull(message = "Patient must be assigned")
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @Future(message = "Appointment time must be in the future")
    @NotNull(message = "Appointment time is required")
    private LocalDateTime appointmentTime;

    @NotNull(message = "Status is required")
    private int status; // 0 = Scheduled, 1 = Completed

    @Size(max = 200, message = "Reason for visit must not exceed 200 characters")
    private String reasonForVisit;

    @Size(max = 300, message = "Notes must not exceed 300 characters")
    private String notes;


    // === Helper Methods ===

    @Transient
    public LocalDateTime getEndTime() {
        return this.appointmentTime.plusHours(1);
    }

    @Transient
    public LocalDate getAppointmentDate() {
        return this.appointmentTime.toLocalDate();
    }

    @Transient
    public LocalTime getAppointmentTimeOnly() {
        return this.appointmentTime.toLocalTime();
    }
}
