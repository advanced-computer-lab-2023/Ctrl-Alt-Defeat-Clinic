import React, { useState } from "react";

function DoctorRegister() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    hourlyRate: "",
    affiliation: "",
    educationalBackground: "",
    specialty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
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
            name="dob"
            value={formData.dob}
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
          <label>Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default DoctorRegister;
