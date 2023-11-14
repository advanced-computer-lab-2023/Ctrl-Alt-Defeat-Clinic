import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UpdateDoctor() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put("http://localhost:8000/api/v1/doctors/updateDoctor", {
        username,
        email,
        hourlyRate,
        affiliation,
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error updating doctor information:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Doctor Information</h1>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Hourly Rate</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
        />
        <br />
        <label>Affiliation</label>
        <input
          type="text"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
        />
        <br />
        <button type="submit">Update Doctor Information</button>
        {success && <p>Updated</p>}
      </form>

      <Link to="/doctors/home">Home</Link>
    </div>
  );
}

export default UpdateDoctor;
