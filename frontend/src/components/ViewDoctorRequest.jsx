import React, { useState } from "react";

function ViewDoctorRequest() {
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate fetching user information based on the provided username.
    // You can replace this with your actual data retrieval logic.
    const userInformation = fetchUserInformation(username); // Replace with actual API call or data retrieval function

    setUserInfo(userInformation);
  };

  const fetchUserInformation = (username) => {
    // Simulated data retrieval - Replace with your actual logic to fetch user info
    if (username === "exampleUser") {
      return {
        username: "exampleUser",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "******",
        dob: "1990-01-01",
        hourlyRate: "100",
        affiliation: "Hospital XYZ",
        educationalBackground: "Medical School XYZ",
        specialty: "Cardiology",
      };
    }
    return null; // Return null if user not found
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
            <strong>Password:</strong> {userInfo.password}
          </p>
          <p>
            <strong>Date of Birth:</strong> {userInfo.dob}
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
