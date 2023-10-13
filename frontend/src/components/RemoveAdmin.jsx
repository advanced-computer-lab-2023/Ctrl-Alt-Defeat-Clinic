import React, { useState } from "react";
import Axios from "axios";

function RemoveAdmin() {
  const [username, setUsername] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/admins/deleteAdmin/" + username
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Remove Admin</h2>
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
        <button type="submit">Remove Admin</button>
      </form>
      {res && <div>admin deleted</div>}
    </div>
  );
}

export default RemoveAdmin;
