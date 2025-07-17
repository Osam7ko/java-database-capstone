// js/services/patientServices.js
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

// 1. Patient Signup
export async function patientSignup(data) {
  try {
    const response = await fetch(PATIENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Signup failed");
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
}

// 2. Patient Login
export async function patientLogin(data) {
  try {
    const response = await fetch(`${PATIENT_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return response; // Caller will handle status/token
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
}

// 3. Get Patient Data by Token
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`);
    if (response.ok) {
      const data = await response.json();
      return data.patient || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch patient data:", error);
    return null;
  }
}

// 4. Get Appointments by ID, Token, and User Role
export async function getPatientAppointments(id, token, user) {
  try {
    const url = `${PATIENT_API}/${id}/${user}/${token}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return null;
  }
}

// 5. Filter Appointments
export async function filterAppointments(condition, name, token) {
  try {
    const url = `${PATIENT_API}/filter/${condition}/${name}/${token}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    } else {
      console.warn("No filtered appointments found.");
      return [];
    }
  } catch (error) {
    console.error("Filtering error:", error);
    alert("Something went wrong while filtering appointments.");
    return [];
  }
}
