// js/doctorDashboard.js

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// References & State
const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0];
const token = localStorage.getItem("token");
let patientName = null;

// Search Functionality
document.getElementById("searchBar")?.addEventListener("input", (e) => {
  const input = e.target.value.trim();
  patientName = input !== "" ? input : "null";
  loadAppointments();
});

// "Today's Appointments" Button
document.getElementById("todayButton")?.addEventListener("click", () => {
  selectedDate = new Date().toISOString().split("T")[0];
  const datePicker = document.getElementById("datePicker");
  if (datePicker) datePicker.value = selectedDate;
  loadAppointments();
});

// Date Picker Change
document.getElementById("datePicker")?.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

// Load Appointments Function
async function loadAppointments() {
  try {
    const appointments = await getAllAppointments(
      selectedDate,
      patientName || "null",
      token
    );

    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center;">No Appointments found for today.</td>
        </tr>`;
      return;
    }

    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail,
      };

      const row = createPatientRow(patient, appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to load appointments:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: red;">Error loading appointments. Try again later.</td>
      </tr>`;
  }
}

// On Page Load
window.addEventListener("DOMContentLoaded", () => {
  // renderContent(); // Uncomment if renderContent is needed to set layout
  loadAppointments();
});
