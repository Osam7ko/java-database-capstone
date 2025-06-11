// updateAppointment.js
import { updateAppointment } from "../services/appointmentRecord.js";

const token = localStorage.getItem("token");
const urlParams = new URLSearchParams(window.location.search);
const appointmentId = urlParams.get("appointmentId");
const patientId = urlParams.get("patientId");
const doctorId = urlParams.get("doctorId");
const patientName = urlParams.get("patientName");
const doctorName = urlParams.get("doctorName");
const appointmentDate = urlParams.get("appointmentDate");
const appointmentTime = urlParams.get("appointmentTime");

const appointmentForm = document.getElementById("updateAppointmentForm");
const dateInput = document.getElementById("appointmentDate");
const timeSelect = document.getElementById("appointmentTime");
const doctorNameSpan = document.getElementById("doctorName");
const patientNameSpan = document.getElementById("patientName");

async function initializePage() {
  if (!token || !patientId) {
    window.location.href = "../pages/patientAppointments.html";
    return;
  }

  try {
    const response = await fetch("../data/doctors.json");
    const doctors = await response.json();
    const selectedDoctor = doctors.find((doc) => doc.id == doctorId);

    if (!selectedDoctor) {
      alert("Doctor not found");
      return;
    }

    // Populate available times
    timeSelect.innerHTML = "";
    selectedDoctor.availableTimes.forEach((time) => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      if (time === appointmentTime) option.selected = true;
      timeSelect.appendChild(option);
    });

    // Fill form values
    doctorNameSpan.textContent = doctorName;
    patientNameSpan.textContent = patientName;
    dateInput.value = appointmentDate;
  } catch (error) {
    console.error("Error loading doctors:", error);
    alert("Failed to load doctor data");
  }
}

appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newDate = dateInput.value;
  const newTime = timeSelect.value;

  if (!newDate || !newTime) {
    alert("Please fill in all fields");
    return;
  }

  const updatedAppointment = {
    id: parseInt(appointmentId),
    appointmentTime: `${newDate}T${newTime}`,
    status: 0,
    patient: { id: parseInt(patientId) },
    doctor: { id: parseInt(doctorId) },
  };

  const result = await updateAppointment(updatedAppointment, token);
  if (result.success) {
    alert("Appointment updated successfully");
    window.location.href = "../pages/patientAppointments.html";
  } else {
    alert(result.message || "Update failed");
  }
});

document.addEventListener("DOMContentLoaded", initializePage);
