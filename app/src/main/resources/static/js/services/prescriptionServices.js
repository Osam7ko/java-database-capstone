import { API_BASE_URL } from "../config.js";

const PRESCRIPTION_API = `${API_BASE_URL}/prescription`;

/**
 * Save a new prescription
 * @param {Object} prescription - The prescription data
 * @param {String} token - The JWT token of the doctor
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function savePrescription(prescription, token) {
  try {
    const response = await fetch(`${PRESCRIPTION_API}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescription),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || "Something went wrong",
    };
  } catch (error) {
    console.error("Error saving prescription:", error);
    return {
      success: false,
      message: "Failed to save prescription due to a network or server error.",
    };
  }
}

/**
 * Get prescription by appointmentId
 * @param {Number} appointmentId - The ID of the appointment
 * @param {String} token - The JWT token of the doctor
 * @returns {Promise<Object>} - Prescription data or throws error
 */
export async function getPrescription(appointmentId, token) {
  try {
    const response = await fetch(
      `${PRESCRIPTION_API}/${appointmentId}/${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch prescription");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching prescription:", error);
    throw error;
  }
}
