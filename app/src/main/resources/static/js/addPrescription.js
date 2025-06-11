import {
  savePrescription,
  getPrescription,
} from "../services/prescriptionServices.js";

document.addEventListener("DOMContentLoaded", async () => {
  const patientNameInput = document.getElementById("patientName");
  const medicationInput = document.getElementById("medication");
  const dosageInput = document.getElementById("dosage");
  const notesInput = document.getElementById("notes");
  const saveBtn = document.getElementById("saveBtn");
  const heading = document.getElementById("prescriptionHeading");

  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get("appointmentId");
  const mode = urlParams.get("mode");
  const patientName = urlParams.get("patientName");
  const token = localStorage.getItem("token");

  if (heading) {
    heading.textContent =
      mode === "view" ? "View Prescription" : "Add Prescription";
  }

  if (patientName && patientNameInput) {
    patientNameInput.value = decodeURIComponent(patientName);
  }

  if (appointmentId && token) {
    try {
      const response = await getPrescription(appointmentId, token);
      if (response.prescription && response.prescription.length > 0) {
        const data = response.prescription[0];
        if (patientNameInput) patientNameInput.value = data.patientName || "";
        if (medicationInput) medicationInput.value = data.medication || "";
        if (dosageInput) dosageInput.value = data.dosage || "";
        if (notesInput) notesInput.value = data.notes || "";
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
    }
  }

  if (mode === "view") {
    [patientNameInput, medicationInput, dosageInput, notesInput].forEach(
      (input) => {
        if (input) input.setAttribute("readonly", true);
      }
    );
    if (saveBtn) saveBtn.style.display = "none";
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const prescription = {
        appointmentId: parseInt(appointmentId),
        patientName: patientNameInput.value,
        medication: medicationInput.value,
        dosage: dosageInput.value,
        notes: notesInput.value,
      };

      try {
        const result = await savePrescription(prescription, token);
        if (result.status === 201) {
          alert("Prescription saved successfully!");
          window.location.href = "../templates/doctor/doctorDashboard.html";
        } else {
          alert(result.message || "Failed to save prescription.");
        }
      } catch (error) {
        console.error("Error saving prescription:", error);
        alert("Something went wrong.");
      }
    });
  }
});
