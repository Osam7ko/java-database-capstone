// patientRecordServices.js
import { getPatientAppointments } from "../services/appointmentService.js";
import { createPatientRecordRow } from "../components/patientRecordRow.js";

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  const tableBody = document.getElementById("patientRecordBody");
  const token = localStorage.getItem("token");

  const urlParams = new URLSearchParams(window.location.search);
  const patientId = urlParams.get("patientId");
  const doctorId = urlParams.get("doctorId");

  if (!token || !patientId || !doctorId) {
    alert("Missing data. Please login again or check the URL.");
    return;
  }

  try {
    const appointments = await getPatientAppointments(
      patientId,
      token,
      "doctor"
    );

    const filteredAppointments = appointments.filter(
      (appt) => appt.doctorId.toString() === doctorId
    );

    tableBody.innerHTML = "";
    document.getElementById("actionsHeader").style.display = "table-cell";

    if (filteredAppointments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4">No Appointments Found.</td>`;
      tableBody.appendChild(row);
      return;
    }

    filteredAppointments.forEach((appointment) => {
      const row = createPatientRecordRow(appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to load patient appointments:", error);
    alert("Failed to load data. Please try again later.");
  }
}
