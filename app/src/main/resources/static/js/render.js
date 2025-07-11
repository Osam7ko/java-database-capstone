// render.js

export function selectRole(role) {
  const token = localStorage.getItem("token");

  switch (role) {
    case "admin":
      window.location.href = `/adminDashboard/${token}`;
      break;
    case "patient":
      window.location.href = "/js/pages/patientDashboard.html";
      break;
    case "doctor":
      window.location.href = `/doctorDashboard/${token}`;
      break;
    case "loggedPatient":
      window.location.href = "/js/pages/loggedPatientDashboard.html";
      break;
    default:
      console.error("Invalid role provided.");
      window.location.href = "/js/pages/index.html";
      break;
  }
}

export function renderContent() {
  const role = localStorage.getItem("role");

  if (!role) {
    window.location.href = "/js/pages/index.html";
    return;
  }

  // future rendering logic based on role
}
