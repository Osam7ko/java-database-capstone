// js/adminDashboard.js
import { openModal } from "./components/modals.js";
import {
  getDoctors,
  filterDoctors,
  saveDoctor,
} from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";
import { getToken, setRole } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
  // Set admin role
  setRole("admin");

  // Load doctors
  loadDoctorCards();

  // Setup event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Add Doctor Button
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => {
      openModal("addDoctor");
    });
  }

  // Filter Events
  const searchBar = document.getElementById("searchBar");
  const filterByTime = document.getElementById("filterByTime");
  const filterBySpecialty = document.getElementById("filterBySpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterByTime)
    filterByTime.addEventListener("change", filterDoctorsOnChange);
  if (filterBySpecialty)
    filterBySpecialty.addEventListener("change", filterDoctorsOnChange);
}

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
}

async function filterDoctorsOnChange() {
  try {
    const searchValue =
      document.getElementById("searchBar")?.value.trim() || "";
    const timeValue = document.getElementById("filterByTime")?.value || "";
    const specialtyValue =
      document.getElementById("filterBySpecialty")?.value || "";

    // If no filters are applied, load all doctors
    if (!searchValue && !timeValue && !specialtyValue) {
      await loadDoctorCards();
      return;
    }

    const doctors = await filterDoctors(
      searchValue || null,
      timeValue || null,
      specialtyValue || null
    );

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

  const name = document.getElementById("doctorName")?.value.trim();
  const email = document.getElementById("doctorEmail")?.value.trim();
  const phone = document.getElementById("doctorPhone")?.value.trim();
  const password = document.getElementById("doctorPassword")?.value.trim();
  const specialization = document
    .getElementById("specialization")
    ?.value.trim();

  const checkboxes = document.querySelectorAll(
    "input[name='availability']:checked"
  );
  const availability = Array.from(checkboxes).map((c) => c.value);

  const token = getToken();
  if (!token) {
    alert("Unauthorized: Please login as admin.");
    return;
  }

  if (!name || !email || !phone || !password || !specialization) {
    alert("Please fill in all required fields.");
    return;
  }

  const doctor = {
    name,
    email,
    phone,
    password,
    specialization,
    availability: availability.length > 0 ? availability : ["09:00-10:00"],
  };

  try {
    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert("✅ Doctor added successfully!");
      document.getElementById("modal").style.display = "none";
      await loadDoctorCards();
    } else {
      alert("❌ Error: " + (result.message || "Failed to add doctor"));
    }
  } catch (error) {
    console.error("Add Doctor Error:", error);
    alert("❌ Failed to add doctor. Please try again.");
  }
}

// Make function globally available
window.adminAddDoctor = adminAddDoctor;
