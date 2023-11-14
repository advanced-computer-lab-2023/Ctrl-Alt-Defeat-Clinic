import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PatientHome() {
  const [patient, setPatient] = useState(null);
  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const showData = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/getMe",
      { withCredentials: true }
    );
    console.log(response.data);
    setPatient(response.data.loggedIn);
  };
  return (
    <div>
      <h2>welcome, patient!</h2>
      <button onClick={showData}>show me</button>
      {patient && (
        <div>
          <p>name: {patient.name}</p>
          <p>username: {patient.username}</p>
          <p>email: {patient.email}</p>
          <p>Wallet Balance: {patient.wallet}</p>
        </div>
      )}
      <ul>
        <li>
          <Link to="/patients/view-all-patient-appointments">View All My Appointments</Link>
        </li>
        <li>
          <Link to="/patients/view-all-available-appointments">View Available Doctor Appointments</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
        <li>
          <Link to="/patients/healthPackages">Show All Health Packages</Link>
        </li>
        <li>
          <Link to="/patients/upload">Upload Medical History</Link>
        </li>
        <li>
          <Link to="/patients/delete">Delete Medical History</Link>
        </li>
      </ul>
    </div>
  );
}

export default PatientHome;
