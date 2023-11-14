import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function RemovePatient() {
  const [username, setUsername] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/admins/deletePatient/" + username
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Remove Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Remove Patient</button>
      </form>
      {res && <div>patient deleted</div>}
      <Link to="/admins/home">Home</Link>
    </div>
  );
}

export default RemovePatient;
