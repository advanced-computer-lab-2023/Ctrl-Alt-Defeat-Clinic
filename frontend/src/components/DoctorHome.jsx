import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DoctorHome() {
  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout"
    );
    console.log(response.data);
  };
  return (
    <div>
      <h2>Welcome, Doctor!</h2>
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
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DoctorHome;
