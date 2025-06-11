import { getAppointments } from "../components/appointmentRow.js";
import { getAppointmentRecord } from "../services/appointmentRecordService.js";

const tableBody = document.querySelector("#appointmentTable tbody");
const filterDropdown = document.getElementById("appointmentFilter");

async function loadAppointments(filter) {
  const token = localStorage.getItem("token");
  const appointments = await getAppointmentRecord(token);

  // No appointments at all
  if (!appointments || appointments.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4">No appointments found.</td></tr>`;
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredAppointments = appointments.filter((app) => {
    const appointmentDate = new Date(app.appointmentTime);
    appointmentDate.setHours(0, 0, 0, 0);
    return filter === "upcoming"
      ? appointmentDate >= today
      : appointmentDate < today;
  });

  if (filteredAppointments.length === 0) {
    const message =
      filter === "upcoming"
        ? "No upcoming appointments found."
        : "No past appointments found.";
    tableBody.innerHTML = `<tr><td colspan="4">${message}</td></tr>`;
    return;
  }

  // Render table rows
  tableBody.innerHTML = "";
  filteredAppointments.forEach((appointment) => {
    const row = getAppointments(appointment);
    tableBody.appendChild(row);
  });
}

filterDropdown.addEventListener("change", (e) => {
  loadAppointments(e.target.value);
});

// Initial load: only upcoming appointments
loadAppointments("upcoming");
