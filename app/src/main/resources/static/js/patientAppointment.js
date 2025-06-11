import {
  getPatientAppointments,
  getPatientData,
  filterAppointments,
} from "../services/patientDashboard.js";

let tableBody;
let token;
let allAppointments = [];
let filteredAppointments = [];
let patientId;

document.addEventListener("DOMContentLoaded", async () => {
  tableBody = document.getElementById("appointmentsBody");
  token = localStorage.getItem("token");

  if (!token) return;

  try {
    const patient = await getPatientData(token);
    patientId = patient.id;

    const all = await getPatientAppointments(token);
    allAppointments = all.filter((app) => app.patientId === patientId);

    renderAppointments(allAppointments);
  } catch (err) {
    console.error("Error loading patient appointments:", err);
  }

  document
    .getElementById("search")
    .addEventListener("input", handleFilterChange);
  document
    .getElementById("filterType")
    .addEventListener("change", handleFilterChange);
});

function renderAppointments(appointments) {
  tableBody.innerHTML = "";
  document.querySelector(".actions-column").style.display = "table-cell";

  if (!appointments.length) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">No Appointments Found.</td>`;
    tableBody.appendChild(row);
    return;
  }

  appointments.forEach((app) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>You</td>
      <td>${app.doctorName}</td>
      <td>${new Date(app.appointmentTime).toLocaleDateString()}</td>
      <td>${new Date(app.appointmentTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}</td>
      <td>
        ${
          app.status === 0
            ? `<img src="../assets/edit/edit.png" class="edit-icon" data-id="${app.id}" style="cursor:pointer;width:20px">`
            : ""
        }
      </td>
    `;

    if (app.status === 0) {
      row.querySelector(".edit-icon").addEventListener("click", () => {
        const params = new URLSearchParams({
          appointmentId: app.id,
          patientId: app.patientId,
          patientName: "You",
          doctorName: app.doctorName,
          doctorId: app.doctorId,
          appointmentDate: new Date(app.appointmentTime)
            .toISOString()
            .split("T")[0],
          appointmentTime: new Date(app.appointmentTime)
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5),
        });
        window.location.href = `../pages/updateAppointment.html?${params.toString()}`;
      });
    }

    tableBody.appendChild(row);
  });
}

async function handleFilterChange() {
  const search = document.getElementById("search").value;
  const type = document.getElementById("filterType").value;

  try {
    const filtered = await filterAppointments(search, type, token);
    filteredAppointments = filtered.filter(
      (app) => app.patientId === patientId
    );
    renderAppointments(filteredAppointments);
  } catch (error) {
    console.error("Error filtering appointments:", error);
  }
}
