// js/adminDashboard.js
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";


//  Event: Add Doctor Button Click
document.getElementById("addDocBtn")?.addEventListener("click", () => {
  openModal("addDoctor");
});

//  Load Doctors on Page Load
document.addEventListener("DOMContentLoaded", loadDoctorCards);

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
}

//  Filter Events
document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);

async function filterDoctorsOnChange() {
  try {
    const name = document.getElementById("searchBar")?.value || null;
    const time = document.getElementById("filterTime")?.value || null;
    const specialty = document.getElementById("filterSpecialty")?.value || null;

    const doctors = await filterDoctors(name, time, specialty);

    if (doctors && doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = `<p>No doctors found with the given filters.</p>`;
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Something went wrong while filtering doctors.");
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach((doc) => {
    const card = createDoctorCard(doc);
    contentDiv.appendChild(card);
  });
}

export async function adminAddDoctor(event) {
  event.preventDefault();

  const name = document.getElementById("docName")?.value.trim();
  const email = document.getElementById("docEmail")?.value.trim();
  const phone = document.getElementById("docPhone")?.value.trim();
  const password = document.getElementById("docPassword")?.value.trim();
  const specialty = document.getElementById("docSpecialty")?.value.trim();

  const checkboxes = document.querySelectorAll("input[name='availability']:checked");
  const availability = Array.from(checkboxes).map((c) => c.value);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Unauthorized: Please login as admin.");
    return;
  }

  const doctor = { name, email, phone, password, specialty, availability };

  try {
    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert("Doctor added successfully!");
      document.getElementById("addDoctorForm").reset();
      document.getElementById("modal-addDoctor")?.classList.remove("show");
      await loadDoctorCards();
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Add Doctor Error:", error);
    alert("Failed to add doctor. Please try again.");
  }
}