// appointmentRecordService.js

import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = `${API_BASE_URL}/appointments`;

// Get all appointments for a doctor based on date and patient name
export async function getAllAppointments(date, patientName, token) {
  try {
    const response = await fetch(
      `${APPOINTMENT_API}/${date}/${patientName}/${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch appointments.");
    }

    const data = await response.json();
    console.log("Appointments API response:", data);
    return data.appointments || [];
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    throw error;
  }
}

// Book a new appointment
export async function bookAppointment(appointment, token) {
  try {
    const response = await fetch(`${APPOINTMENT_API}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    const result = await response.json();
    return {
      success: response.ok,
      message: result.message || "Could not book appointment.",
    };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return {
      success: false,
      message: "Network error or server unavailable.",
    };
  }
}

// Update an existing appointment
export async function updateAppointment(appointment, token) {
  try {
    const response = await fetch(`${APPOINTMENT_API}/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    const result = await response.json();
    return {
      success: response.ok,
      message: result.message || "Could not update appointment.",
    };
  } catch (error) {
    console.error("Error updating appointment:", error);
    return {
      success: false,
      message: "Network error or server unavailable.",
    };
  }
}
