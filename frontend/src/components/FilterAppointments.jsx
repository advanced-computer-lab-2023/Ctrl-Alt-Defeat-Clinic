import React, { useState } from "react";
import Axios from "axios";

function FilterAppointments() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");

    const [userInfo, setUserInfo] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const userInformation = await Axios.get(
        `http://localhost:8000/api/v1/appointments/filterAppointments?startDate=${startDate}&endDate=${endDate}&status=${status}`
      );

      console.log(userInformation);
      setUserInfo(userInformation.data);
    };
  
    return (
      <div>
        <h2>Filter Appointments</h2>
        <form onSubmit={handleSubmit}>
          <div>
          <label>Enter Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          </div>
          <div>
          <label>Enter End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          </div>
          <div>
          <label>Enter Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          </div>
          <div>
            <button type="submit">Filter Appointments</button>
          </div>
        </form>
        {userInfo && userInfo.map((user, index) => (
        <div key={index}>
            <h3>Appointment {index +1} Information:</h3>
            <p>
            <strong>Patient Username:</strong> {user.patient}
            </p>
            <p>
                <strong>Doctor Username:</strong> {user.doctor}
            </p>
            <p>
                <strong>Date & Time:</strong> {user.date}
            </p>
            <p>
                <strong>Status:</strong> {user.status}
            </p>
        </div>
        ))}

      </div>
    );
}

export default FilterAppointments;