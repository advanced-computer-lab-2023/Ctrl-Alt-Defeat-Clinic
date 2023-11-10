import { useState } from "react";
import Axios from "axios";

function ViewAllDoctorsAppointments() {
  
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [doctorUsername, setDoctorUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentInformation = await Axios.get(
      `http://localhost:8000/api/v1/doctors/viewDoctorAppointments?username=${doctorUsername}` //TODO
    );
    console.log(appointmentInformation);
    setAppointmentInfo(appointmentInformation.data);
  };

  return (
    <div>
      <h2>View All Appointments</h2>
      <label>Doctor Username</label>
      <input
        type="text"
        value={doctorUsername}
        onChange={(e) => setDoctorUsername(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">View All Appointments</button>
        </div>
      </form>
      {appointmentInfo &&
        appointmentInfo.map((appointment, index) => (
          <div key={index}>
            <h3>Appointment {index + 1} Information:</h3>
            <p>
              <strong>Patient Username:</strong> {appointment.patient}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
          </div>
        ))}
    </div>
  );
}

export default ViewAllDoctorsAppointments;
