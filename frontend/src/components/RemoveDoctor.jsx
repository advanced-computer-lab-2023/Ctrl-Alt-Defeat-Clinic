import React, { useState } from "react";
import Axios from "axios";

function RemoveDoctor() {
  const [username, setUsername] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/admins/deleteDoctor/" + username
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Remove Doctor</h2>
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
        <button type="submit">Remove Doctor</button>
      </form>
      {res && <div>doctor deleted</div>}
    </div>
  );
}

export default RemoveDoctor;
