import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PatientHome() {
  const [doctor, setDoctor] = useState(null);
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
    setDoctor(response.data.loggedIn);
  };
  return (
    <div>
      <h2>welcome, patient!</h2>
      <button onClick={showData}>show me</button>
      {doctor && (
        <div>
          <p>name: {doctor.name}</p>
          <p>username: {doctor.username}</p>
          <p>email: {doctor.email}</p>
        </div>
      )}
      <ul>
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
