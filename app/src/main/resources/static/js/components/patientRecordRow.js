export function createPatientRecordRow(patient) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${patient.appointmentDate}</td>
    <td>${patient.id}</td>
    <td>${patient.patientId}</td>
    <td>
      <img 
        src="/assets/images/addPrescriptionIcon/addPrescriptionIcon.png" 
        alt="View Prescription" 
        class="prescription-btn" 
        style="cursor: pointer; width: 20px;" 
        data-id="${patient.id}" 
      />
    </td>
  `;

  const viewBtn = tr.querySelector(".prescription-btn");
  viewBtn.addEventListener("click", () => {
    window.location.href = `../pages/addPrescription.html?mode=view&appointmentId=${patient.id}`;
  });

  return tr;
}
