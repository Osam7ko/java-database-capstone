// util.js

/**
 * Stores the user's role in localStorage.
 * @param {string} role - The role to store (e.g., "admin", "doctor", "patient")
 */
export function setRole(role) {
  localStorage.setItem("userRole", role);
}

/**
 * Retrieves the user's role from localStorage.
 * @returns {string|null} - The stored role or null if not found
 */
export function getRole() {
  return localStorage.getItem("userRole");
}

/**
 * Clears the user's role from localStorage.
 */
export function clearRole() {
  localStorage.removeItem("userRole");
}
