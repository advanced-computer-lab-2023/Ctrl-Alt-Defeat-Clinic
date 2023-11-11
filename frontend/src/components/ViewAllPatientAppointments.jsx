import { useState } from "react";
import Axios from "axios";

function ViewAllPatientAppointments() {
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [doctorUsername, setDoctorUsername] = useState('');

  const [appointmentInfo, setAppointmentInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentInformation = await Axios.get(
      `http://localhost:8000/api/v1/patients/viewPatientAppointments?username=${doctorUsername}&startDate=${startDate? new Date(startDate) : ""}&endDate=${endDate? new Date(endDate) : ""}&status=${status}` //TODO
    );
    console.log(appointmentInformation);
    setAppointmentInfo(appointmentInformation.data);
  };

  const renderAppointmentsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentInfo.map((appointment, index) => (
            <tr key={index}>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>View All Appointments</h2>
      
      <label>Patient Username: </label>
      <input
        type="text"
        value={doctorUsername}
        onChange={(e) => setDoctorUsername(e.target.value)}
      />

<     form onSubmit={handleSubmit}>
        <div>
          <label>Start Date: </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date: </label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Status: </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>
        <div>
          <button type="submit">View All Appointments</button>
        </div>
      </form>


      {/* {appointmentInfo &&
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
        ))} */}

      {appointmentInfo && appointmentInfo.length > 0 && renderAppointmentsTable()}
      {!appointmentInfo || appointmentInfo.length === 0 && <p>No appointments found.</p>}

    </div>
  );
}

export default ViewAllPatientAppointments;
