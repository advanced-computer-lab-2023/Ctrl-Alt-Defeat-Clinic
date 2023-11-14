import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DoctorRegister() {
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationalBackground: "",
    speciality: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.post(
      "http://localhost:8000/api/v1/doctors/register",
      formData
    );
    console.log(response.data);
    setRes(response.data);
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div>
      <h2>Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="text"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Affiliation:</label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Educational Background:</label>
          <input
            type="text"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Speciality:</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {res && <div>doctor request sent</div>}
      <Link to="/">Back</Link>
    </div>
  );
}

export default DoctorRegister;
