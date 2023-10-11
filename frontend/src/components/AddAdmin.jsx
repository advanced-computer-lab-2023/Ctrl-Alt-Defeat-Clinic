import React, { useState } from "react";

function AddAdmin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as adding the admin to your system.
    console.log(formData);
    // Clear the form fields after submission if needed
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div>
      <h2>Add Admin</h2>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
}

export default AddAdmin;
