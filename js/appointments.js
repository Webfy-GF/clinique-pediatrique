let appointments = [
  { child: "Lucas", date: "2026-03-10", time: "10:00", status: "pending" },
  { child: "Emma", date: "2026-03-11", time: "11:30", status: "confirmed" }
];

function renderAppointments() {
  const tbody = document.querySelector("#appointmentsTable tbody");
  tbody.innerHTML = "";
  appointments.forEach(appt => {
    tbody.innerHTML += `<tr>
      <td>${appt.child}</td>
      <td>${appt.date}</td>
      <td>${appt.time}</td>
      <td><span class="${appt.status}">${appt.status}</span></td>
    </tr>`;
  });
}

renderAppointments();

document.getElementById("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const child = document.getElementById("apptChild").value;
  const date = document.getElementById("apptDate").value;
  const time = document.getElementById("apptTime").value;
  const status = document.getElementById("apptStatus").value;
  appointments.push({ child, date, time, status });
  renderAppointments();
  e.target.reset();
});