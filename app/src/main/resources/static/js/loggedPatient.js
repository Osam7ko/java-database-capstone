import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { bookAppointment } from "./services/appointmentRecordService.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { getPatientData } from "./services/patientServices.js";

let currentPatient = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    currentPatient = await getPatientData(token);

    if (!currentPatient) {
      alert("⚠️ Session expired. Please log in again.");
      window.location.href = "/pages/patientDashboard.html";
      return;
    }

    loadDoctorCards();


    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

  } catch (err) {
    console.error("Failed to load patient data:", err);
    window.location.href = "/pages/patientDashboard.html";
  }
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    const container = document.getElementById("content");
    container.innerHTML = "";

    doctors.forEach((doctor) => {
      const card = createDoctorCard(doctor, (doc) => showBookingOverlay(doc, currentPatient));
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
}


export function showBookingOverlay(doctor, patient) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  document.body.appendChild(ripple);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Book Appointment</h2>
      <label>Doctor: <input type="text" value="${doctor.name}" disabled></label>
      <label>Patient: <input type="text" value="${
        patient.name
      }" disabled></label>
      <label>Date: <input type="date" id="appointmentDate"></label>
      <label>Time:
        <select id="appointmentTime">
          ${doctor.availableTimes
            .map((time) => `<option value="${time}">${time}</option>`)
            .join("")}
        </select>
      </label>
      <button id="confirmBooking">Confirm Booking</button>
    </div>
  `;

  document.body.appendChild(modal);

  document
    .getElementById("confirmBooking")
    .addEventListener("click", async () => {
      const date = document.getElementById("appointmentDate").value;
      const time = document.getElementById("appointmentTime").value;
      const datetime = new Date(`${date}T${time}`);

      const appointment = {
        patientId: patient.id,
        doctorId: doctor.id,
        appointmentTime: datetime.toISOString(),
      };

      try {
        const result = await bookAppointment(
          appointment,
          localStorage.getItem("token")
        );
        if (result.success) {
          alert("Appointment booked!");
          document.body.removeChild(modal);
          document.body.removeChild(ripple);
        } else {
          alert(result.message || "Failed to book appointment.");
        }
      } catch (error) {
        alert("Error booking appointment.");
        console.error(error);
      }
    });
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const speciality = document.getElementById("filterSpecialty").value || null;

  try {
    const doctors = await filterDoctors(name, time, speciality);
    const container = document.getElementById("content");
    container.innerHTML = "";

    if (doctors.length > 0) {
      doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor, (doc) => showBookingOverlay(doc, currentPatient));
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
  }
}


export function renderDoctorCards(doctors) {
  const container = document.getElementById("doctorCards");
  container.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor, showBookingOverlay);
    container.appendChild(card);
  });
}
