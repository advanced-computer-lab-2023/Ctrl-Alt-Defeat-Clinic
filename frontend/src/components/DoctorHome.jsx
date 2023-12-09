import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contract from "./Contract";

function DoctorHome() {
  const [doctor, setDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout",
      { withCredentials: true }
    );
    console.log(response.data);
  };

  const showData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/getMe",
        { withCredentials: true }
      );
      console.log(response.data);
      setDoctor(response.data.loggedIn);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    // Fetch doctor information on mount
    showData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h2>Welcome, Doctor!</h2>
      <button onClick={handleShowDetails}>Show My Info</button>
      {showDetails && doctor && (
        <div>
          <p>name: {doctor.name}</p>
          <p>username: {doctor.username}</p>
          <p>email: {doctor.email}</p>
          <p>registration status: {doctor.registrationStatus}</p>
          <p>wallet Balance: {doctor.wallet}</p>
        </div>
      )}
      <ul>
        <li>
          <Link to="/doctors/update-my-info">Update Doctor</Link>
        </li>
        <li>
          <Link to="/doctors/my-patients">View All My Patients</Link>
        </li>
        <li>
          <Link to="/doctors/search">Search Patient</Link>
        </li>
        <li>
          <Link to="/doctors/scheduleFollowUp">Schedule Follow-Up</Link>
        </li>
        <li>
          <Link to="/doctors/view-all-doctor-appointments">
            View All My Appointments
          </Link>
        </li>
        <li>
          <Link to="/doctors/add-time-slot">Add New Time Slot</Link>
        </li>
        <li>
          <Link to="/changePassword">change password</Link>
        </li>
        <li>
          <Link to="/doctors/view-patient-medical-history">
            View Patient Medical History
          </Link>
        </li>
        <li>
          <Link to="/doctors/Prescriptions">Add or Update Prescriptions</Link>
        </li>
        <li>
          <Link to="/doctors/downloadPrescription">Download Prescription</Link>
        </li>
        <li>
          <Link to="/chats">Chats</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>

      {doctor && doctor.registrationStatus === "partially accepted" && (
        <div>
          <Contract username={doctor.username} hourlyRate={doctor.hourlyRate} />
        </div>
      )}
    </div>
  );
}

export default DoctorHome;
