// render.js

export function selectRole(role) {
  const token = localStorage.getItem("token");

  switch (role) {
    case "admin":
      window.location.href = `/adminDashboard/${token}`;
      break;
    case "doctor":
      window.location.href = `/doctorDashboard/${token}`;
      break;
    case "patient":
      window.location.href = "/pages/patientDashboard.html";
      break;
    case "loggedPatient":
      window.location.href = "/pages/loggedPatientDashboard.html";
      break;
    default:
      console.error("Invalid role provided.");
      window.location.href = "/index.html";
      break;
  }
}

export function renderContent() {
  const role = localStorage.getItem("userRole");

  if (!role) {
    window.location.href = "/index.html";
    return;
  }

  // future rendering logic based on role
}
window.renderContent = renderContent;
