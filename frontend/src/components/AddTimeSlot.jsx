import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTimeSlot() {

  const [res, setRes] = useState(null);

  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.put(
      `http://localhost:8000/api/v1/doctors/addAvailableSlot?slotDate=${dateTime}`, {} ,{withCredentials: true}
    );
    console.log(response.data);
    setRes(response.data);
  };

  return (
    <div>
      <h2>Add New Time Slot</h2>
      <form onSubmit={handleSubmit}>
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
      {(res && res.modifiedCount!=0) && <div>Time slot added successfully </div>}
      {(res && res.modifiedCount==0) && <div>Time slot already exists </div>}
    </div>
  );
}

export default AddTimeSlot;
