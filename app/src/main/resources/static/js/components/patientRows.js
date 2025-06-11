export function createPatientRow(patient, appointmentId, doctorId) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="patient-id" style="cursor: pointer;">${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.phone}</td>
    <td>${patient.email}</td>
    <td>
      <img 
        src="/assets/images/addPrescriptionIcon/addPrescriptionIcon.png" 
        alt="Add Prescription" 
        class="prescription-btn" 
        style="cursor: pointer; width: 20px;" 
        data-id="${patient.id}"
      />
    </td>
  `;

  const patientIdCell = tr.querySelector(".patient-id");
  patientIdCell.addEventListener("click", () => {
    window.location.href = `../pages/patientRecord.html?patientId=${patient.id}&doctorId=${doctorId}`;
  });

  const prescriptionBtn = tr.querySelector(".prescription-btn");
  prescriptionBtn.addEventListener("click", () => {
    window.location.href = `../pages/addPrescription.html?appointmentId=${appointmentId}&patientName=${encodeURIComponent(
      patient.name
    )}`;
  });

  return tr;
}
