import React, { useState } from "react";
import Axios from "axios";

function PatientRegister() {
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dob,
      gender: formData.gender,
      mobileNumber: formData.phoneNumber,
      emergencyContact: {
        fullName: formData.emergencyContactName,
        mobileNumber: formData.emergencyContactNumber,
        familyMembers: [],
      },
    };
    const response = await Axios.post(
      "http://localhost:8000/api/v1/patients/register",
      data
    );
    setRes(response);
    // You can handle form submission logic here, such as sending the data to an API endpoint.
    console.log(response.data);
    setFormData({
      username: "",
      name: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      phoneNumber: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
    });
  };

  return (
    <div>
      <h2>Patient Registration</h2>
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
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Name:</label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Contact Phone Number:</label>
          <input
            type="tel"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {res && <div>patient registered</div>}
    </div>
  );
}

export default PatientRegister;
