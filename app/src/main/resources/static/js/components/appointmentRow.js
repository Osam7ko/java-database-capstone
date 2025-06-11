export function getAppointments(appointment) {
  const tr = document.createElement("tr");

  const dateTime = new Date(appointment.appointmentTime);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  tr.innerHTML = `
    <td>${appointment.patient.name}</td>
    <td>${appointment.doctor.name}</td>
    <td>${date}</td>
    <td>${time}</td>
    <td>
      <img 
        src="/assets/images/edit/edit.png" 
        alt="Edit" 
        class="prescription-btn" 
        style="cursor: pointer; width: 20px;" 
        data-id="${appointment.id}"
      />
    </td>
  `;

  const editIcon = tr.querySelector(".prescription-btn");
  editIcon.addEventListener("click", () => {
    window.location.href = `../pages/addPrescription.html?id=${appointment.id}`;
  });

  return tr;
}
