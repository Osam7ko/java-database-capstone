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

/**
 * Stores the user's token in localStorage.
 * @param {string} token - The token to store
 */
export function setToken(token) {
  localStorage.setItem("token", token);
}

/**
 * Retrieves the user's token from localStorage.
 * @returns {string|null} - The stored token or null if not found
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Clears the user's token from localStorage.
 */
export function clearToken() {
  localStorage.removeItem("token");
}

/**
 * Clears all user data from localStorage.
 */
export function clearUserData() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
}
