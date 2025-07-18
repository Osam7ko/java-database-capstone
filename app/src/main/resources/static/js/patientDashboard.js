import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { filterDoctors, getDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";
import { selectRole } from "./render.js";
import { setRole, setToken } from "./util.js";

document.addEventListener("DOMContentLoaded", () => {
  // Set patient role when accessing this page
  setRole("patient");

  // Load doctor cards
  loadDoctorCards();

  // Setup event listeners
  setupEventListeners();
});

function setupEventListeners() {
  const signupBtn = document.getElementById("signupPatientBtn");
  const loginBtn = document.getElementById("loginPatientBtn");

  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  // Filter event listeners
  const searchBar = document.getElementById("searchBar");
  const filterTime = document.getElementById("filterTime");
  const filterSpecialty = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);
  if (filterSpecialty)
    filterSpecialty.addEventListener("change", filterDoctorsOnChange);
}

function loadDoctorCards() {
  getDoctors()
    .then((doctors) => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "";

      doctors.forEach((doctor) => {
        const card = createDoctorCard(doctor);
        contentDiv.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Failed to load doctors:", error);
    });
}

function filterDoctorsOnChange() {
  const searchBar = document.getElementById("searchBar")?.value.trim() || "";
  const filterTime = document.getElementById("filterTime")?.value || "";
  const filterSpecialty =
    document.getElementById("filterSpecialty")?.value || "";

  // If no filters are applied, load all doctors
  if (!searchBar && !filterTime && !filterSpecialty) {
    loadDoctorCards();
    return;
  }

  const name = searchBar.length > 0 ? searchBar : null;
  const time = filterTime.length > 0 ? filterTime : null;
  const specialty = filterSpecialty.length > 0 ? filterSpecialty : null;

  filterDoctors(name, time, specialty)
    .then((response) => {
      const doctors = response;
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "";

      if (doctors && doctors.length > 0) {
        console.log("Found doctors:", doctors);
        doctors.forEach((doctor) => {
          const card = createDoctorCard(doctor);
          contentDiv.appendChild(card);
        });
      } else {
        contentDiv.innerHTML =
          "<p>No doctors found with the given filters.</p>";
        console.log("No doctors found");
      }
    })
    .catch((error) => {
      console.error("Failed to filter doctors:", error);
      alert("❌ An error occurred while filtering doctors.");
    });
}

export function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Global functions for modal handlers
window.signupPatient = async function () {
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);
    if (success) {
      alert(message);
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

window.loginPatient = async function () {
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email, password };
    console.log("loginPatient :: ", data);

    const response = await patientLogin(data);
    console.log("Status Code:", response.status);
    console.log("Response OK:", response.ok);

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      // Store token and update role
      setToken(result.token);
      setRole("loggedPatient");

      // Redirect to logged patient dashboard
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("❌ Invalid credentials!");
    }
  } catch (error) {
    alert("❌ Failed to Login: " + error.message);
    console.log("Error :: loginPatient :: ", error);
  }
};
