// js/services/doctorServices.js

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

// 1. Get All Doctors
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.error("Failed to fetch doctors");
      return [];
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

// 2. Delete Doctor by ID (Admin only)
export async function deleteDoctor(id, token) {
  try {
    const url = `${DOCTOR_API}/${id}?token=${token}`;
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, message: data.message };
    } else {
      return { success: false, message: "Failed to delete doctor." };
    }
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return { success: false, message: "Something went wrong." };
  }
}

// 3. Save New Doctor (Admin only)
export async function saveDoctor(doctor, token) {
  try {
    const url = `${DOCTOR_API}/add?token=${token}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });

    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error("Error saving doctor:", error);
    return { success: false, message: "Unable to add doctor." };
  }
}

// 4. Filter Doctors by name, time, and specialty
export async function filterDoctors(name, time, specialty) {
  try {
    const url = `${DOCTOR_API}/filter/${name || "null"}/${time || "null"}/${
      specialty || "null"
    }`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || [];
    } else {
      console.warn("No doctors found matching the filters.");
      return [];
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Failed to load filtered results. Please try again.");
    return [];
  }
}
