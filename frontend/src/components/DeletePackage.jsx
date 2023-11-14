import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function DeletePackage() {
  const [res, setRes] = useState(null);
  const [packageName, setPackageName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/packages/deletePackage/" + packageName
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Delete Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Package Name to Delete:</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Package</button>
      </form>
      {res && <div>package deleted</div>}
      <Link to="/admins/home">Home</Link>
    </div>
  );
}

export default DeletePackage;
