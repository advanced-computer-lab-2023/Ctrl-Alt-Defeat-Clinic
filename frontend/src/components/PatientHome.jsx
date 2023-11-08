import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PatientHome() {
  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/auth/logout"
    );
    console.log(response.data);
  };
  return (
    <div>
      <ul>
        <h2>welcome, patient!</h2>
        <li>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PatientHome;
