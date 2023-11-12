import { useState, useEffect } from "react";
import Axios from "axios";

function ViewAvailableAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentInfo, setAppointmentInfo] = useState(null);

  // Fetch the list of doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Axios.get("http://localhost:8000/api/v1/doctors/viewAllDoctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patients/viewDoctorSlots?doctorUsername=${selectedDoctor}`,
        {withCredentials: true}
      );
      setAppointmentInfo(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const renderAppointmentsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {appointmentInfo.map((dateTime, index) => (
            <tr key={index}>
              <td>{new Date(dateTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>View Available Appointments</h2>

      <label>Select a Doctor: </label>
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="" disabled>Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.username} value={doctor.username}>{doctor.name}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">View Available Appointments</button>
        </div>
      </form>

      {appointmentInfo && appointmentInfo.length > 0 ? renderAppointmentsTable() : <p>No appointments found.</p>}
    </div>
  );
}

export default ViewAvailableAppointments;
