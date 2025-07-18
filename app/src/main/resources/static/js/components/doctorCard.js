// js/components/doctorCard.js

import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { getToken, getRole } from "../util.js";

/**
 * Creates a reusable doctor card component.
 * @param {Object} doctor - The doctor object (name, email, specialization, availability).
 * @returns {HTMLElement} The constructed doctor card DOM element.
 */
export function createDoctorCard(doctor) {
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  const role = getRole();

  // Doctor Info
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialization: ${
    doctor.specialization || doctor.specialty
  }`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const phone = document.createElement("p");
  phone.textContent = `Phone: ${doctor.phone}`;

  const availability = document.createElement("p");
  const availabilityList = Array.isArray(doctor.availability)
    ? doctor.availability
    : Array.isArray(doctor.availableTimes)
    ? doctor.availableTimes
    : [];
  availability.textContent = `Available: ${
    availabilityList.join(", ") || "Not specified"
  }`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(phone);
  infoDiv.appendChild(availability);

  // Actions
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("adminBtn");

    removeBtn.addEventListener("click", async () => {
      const confirmed = confirm("Are you sure you want to delete this doctor?");
      if (!confirmed) return;

      const token = getToken();
      try {
        const success = await deleteDoctor(doctor.id, token);
        if (success) {
          alert("Doctor deleted successfully.");
          card.remove();
        } else {
          alert("Failed to delete doctor.");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the doctor.");
      }
    });

    actionsDiv.appendChild(removeBtn);
  } else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("bookBtn");

    bookNow.addEventListener("click", () => {
      alert("Please log in first to book an appointment.");
    });

    actionsDiv.appendChild(bookNow);
  } else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("bookBtn");

    bookNow.addEventListener("click", async (e) => {
      const token = getToken();
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      try {
        const patientData = await getPatientData(token);
        if (patientData) {
          // Use the global showBookingOverlay function
          if (typeof window.showBookingOverlay === "function") {
            window.showBookingOverlay(doctor, patientData);
          } else {
            alert(
              "Booking functionality is not available. Please refresh the page."
            );
          }
        } else {
          alert("Unable to load patient data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        alert("Unable to proceed with booking. Try again later.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  // Assemble card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
