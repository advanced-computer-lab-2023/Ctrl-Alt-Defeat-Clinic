import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTimeSlot() {

  const [res, setRes] = useState(null);

  const [username, setUsername] = useState('');
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.put(
      `http://localhost:8000/api/v1/doctors/addAvailableSlot?username=${username}&slotDate=${dateTime}`
    );
    console.log(response.data);
    setRes(response.data);
  };

  return (
    <div>
      <h2>Add New Time Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available Date and Time: </label>
          <input
            type="datetime-local"
            name="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Time Slot</button>
      </form>
      {(res.modifiedCount!=0) && <div>Time slot added successfully </div>}
      {(res.modifiedCount==0) && <div>Time slot already exists </div>}
    </div>
  );
}

export default AddTimeSlot;
