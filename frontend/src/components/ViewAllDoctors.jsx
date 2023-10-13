import React, { useState } from "react";
import Axios from "axios";

function ViewAllDoctors() {
    const [username, setUsername] = useState("");
    const [userInfo, setUserInfo] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userInformation = await Axios.get(
        "http://localhost:8000/api/v1/patients/viewDoctors/" + username
      );
      console.log(userInformation);
      setUserInfo(userInformation.data);
    };
  
    return (
      <div>
        <h2>View List of All Doctors</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <label>Enter Patient Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
            <button type="submit">View All Doctors</button>
          </div>
        </form>
        {userInfo && userInfo.map((user, index) => (
        <div key={index}>
            <h3>Doctor {index +1} Information:</h3>
            <p>
            <strong>Name:</strong> {user.name}
            </p>
            <p>
            <strong>Speciality:</strong> {user.speciality}
            </p>
            <p>
            <strong>Session Price:</strong> {user.sessionPrice}
            </p>
        </div>
        ))}

      </div>
    );
  }
  
  export default ViewAllDoctors;