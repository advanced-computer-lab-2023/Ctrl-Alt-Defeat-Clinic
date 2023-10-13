import React, { useState } from "react";
import Axios from "axios";

function ViewDoctorRequest() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInformation = await Axios.get(
      "http://localhost:8000/api/v1/doctors/doctordetails/" + username
    );
    console.log(userInformation);
    setUserInfo(userInformation.data.data);
  };

  return (
    <div>
      <h2>View Doctor Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit">View User Info</button>
        </div>
      </form>
      {userInfo && (
        <div>
          <h3>User Information:</h3>
          <p>
            <strong>Username:</strong> {userInfo.username}
          </p>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {userInfo.dateOfBirth}
          </p>
          <p>
            <strong>Hourly Rate:</strong> {userInfo.hourlyRate}
          </p>
          <p>
            <strong>Affiliation:</strong> {userInfo.affiliation}
          </p>
          <p>
            <strong>Educational Background:</strong>{" "}
            {userInfo.educationalBackground}
          </p>
          <p>
            <strong>Specialty:</strong> {userInfo.specialty}
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewDoctorRequest;
