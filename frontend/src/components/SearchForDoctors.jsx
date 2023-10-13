import React, { useState } from "react";
import Axios from "axios";

function SearchForDoctors() {
    const [username, setUsername] = useState("");
    const [speciality, setSpeciality] = useState("");

    const [userInfo, setUserInfo] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userInformation = await Axios.get(
        `http://localhost:8000/api/v1/patients/searchForDoctors?name=${username}&speciality=${speciality}`
      );

      console.log(username);
      console.log(speciality);
      console.log(userInformation);
      setUserInfo(userInformation.data);
    };
  
    return (
      <div>
        <h2>Search For Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <label>Enter Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
          <label>Enter Speciality:</label>
          <input
            type="text"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />
          </div>
          <div>
            <button type="submit">Search For Doctor</button>
          </div>
        </form>
        {userInfo && userInfo.map((user, index) => (
        <div key={index}>
            <h3>Doctor {index +1} Information:</h3>
            <p>
            <strong>Username:</strong> {user.username}
            </p>
            <p>
                <strong>Name:</strong> {user.name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
            <p>
                <strong>Hourly Rate:</strong> {user.hourlyRate}
            </p>
            <p>
                <strong>Affiliation:</strong> {user.affiliation}
            </p>
            <p>
                <strong>Educational Background:</strong>{" "}
                {user.educationalBackground}
            </p>
            <p>
                <strong>Speciality:</strong> {user.speciality}
            </p>
        </div>
        ))}

      </div>
    );
  }
  
  export default SearchForDoctors;