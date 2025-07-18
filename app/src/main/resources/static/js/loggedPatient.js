import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { bookAppointment } from "./services/appointmentRecordService.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { getPatientData } from "./services/patientServices.js";
import { getToken, setRole } from "./util.js";

let currentPatient = null;

document.addEventListener("DOMContentLoaded", async () => {
  // Set logged patient role
  setRole("loggedPatient");

  try {
    const token = getToken();
    if (!token) {
      alert("⚠️ Session expired. Please log in again.");
      window.location.href = "/pages/patientDashboard.html";
      return;
    }

    currentPatient = await getPatientData(token);

    if (!currentPatient) {
      alert("⚠️ Session expired. Please log in again.");
      window.location.href = "/pages/patientDashboard.html";
      return;
    }

    loadDoctorCards();
    setupEventListeners();
  } catch (err) {
    console.error("Failed to load patient data:", err);
    window.location.href = "/pages/patientDashboard.html";
  }
});

function setupEventListeners() {
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty)
    filterSpecialty.addEventListener("change", filterDoctorsOnChange);
}

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    const container = document.getElementById("content");
    container.innerHTML = "";

    doctors.forEach((doctor) => {
      const card = createDoctorCard(doctor);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
}

export function showBookingOverlay(doctor, patient) {
  const overlay = document.getElementById("bookingOverlay");
  const content = document.getElementById("booking-content");

  if (!overlay || !content) {
    alert("Booking interface not available. Please refresh the page.");
    return;
  }

  // Get available times from doctor data
  const availableTimes = doctor.availability ||
    doctor.availableTimes || [
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
    ];

  content.innerHTML = `
    <h2>Book Appointment</h2>
    <div class="booking-form">
      <label>Doctor: <input type="text" value="${doctor.name}" disabled></label>
      <label>Patient: <input type="text" value="${
        patient ? patient.name : "Current Patient"
      }" disabled></label>
      <label>Date: <input type="date" id="appointmentDate" min="${
        new Date().toISOString().split("T")[0]
      }"></label>
      <label>Time:
        <select id="appointmentTime">
          ${availableTimes
            .map((time) => {
              const timeValue = time.includes("-") ? time.split("-")[0] : time;
              return `<option value="${timeValue}">${time}</option>`;
            })
            .join("")}
        </select>
      </label>
      <div class="booking-buttons">
        <button id="confirmBooking" class="dashboard-btn">Confirm Booking</button>
        <button id="cancelBooking" class="dashboard-btn secondary">Cancel</button>
      </div>
    </div>
  `;

  overlay.style.display = "block";

  // Setup event listeners
  document
    .getElementById("confirmBooking")
    .addEventListener("click", async () => {
      await handleBookingConfirmation(doctor, patient || currentPatient);
    });

  document.getElementById("cancelBooking").addEventListener("click", () => {
    overlay.style.display = "none";
  });

  document.getElementById("closeBooking").addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

async function handleBookingConfirmation(doctor, patient) {
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;

  if (!date) {
    alert("Please select a date for the appointment.");
    return;
  }

  if (!time) {
    alert("Please select a time for the appointment.");
    return;
  }

  // Create proper datetime format
  const timeFormatted = time.includes(":") ? time : `${time}:00`;
  const datetime = new Date(`${date}T${timeFormatted}:00`);

  // Create appointment object with proper structure expected by backend
  const appointment = {
    patient: {
      id: patient.id,
      name: patient.name,
      email: patient.email,
    },
    doctor: {
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization || doctor.specialty,
    },
    appointmentTime: datetime.toISOString(),
  };

  console.log("Booking appointment:", appointment);

  try {
    const result = await bookAppointment(appointment, getToken());
    console.log("Booking result:", result);

    if (result.success) {
      alert("✅ Appointment booked successfully!");
      document.getElementById("bookingOverlay").style.display = "none";
    } else {
      alert("❌ " + (result.message || "Failed to book appointment."));
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("❌ Error booking appointment: " + error.message);
  }
}

async function filterDoctorsOnChange() {
  const searchValue = document.getElementById("searchBar")?.value.trim() || "";
  const timeValue = document.getElementById("filterTime")?.value || "";
  const specialtyValue =
    document.getElementById("filterSpecialty")?.value || "";

  // If no filters are applied, load all doctors
  if (!searchValue && !timeValue && !specialtyValue) {
    await loadDoctorCards();
    return;
  }

  const name = searchValue || null;
  const time = timeValue || null;
  const specialty = specialtyValue || null;

  try {
    const doctors = await filterDoctors(name, time, specialty);
    const container = document.getElementById("content");
    container.innerHTML = "";

    if (doctors && doctors.length > 0) {
      doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

export function renderDoctorCards(doctors) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    container.appendChild(card);
  });
}

// Make showBookingOverlay globally available
window.showBookingOverlay = showBookingOverlay;
