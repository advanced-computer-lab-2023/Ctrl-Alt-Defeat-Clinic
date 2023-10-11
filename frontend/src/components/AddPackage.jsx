import React, { useState } from "react";

function AddPackage() {
  const [formData, setFormData] = useState({
    packageName: "",
    price: "",
    doctorDiscount: "",
    medicalDiscount: "",
    familyDiscount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as saving the package data to your system.
    console.log(formData);
    // Clear the form fields after submission if needed.
    setFormData({
      packageName: "",
      price: "",
      doctorDiscount: "",
      medicalDiscount: "",
      familyDiscount: "",
    });
  };

  return (
    <div>
      <h2>Add Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Package Name:</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Doctor Session Discount:</label>
          <input
            type="number"
            name="doctorDiscount"
            value={formData.doctorDiscount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Medical Discount:</label>
          <input
            type="number"
            name="medicalDiscount"
            value={formData.medicalDiscount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Family Subscription Discount:</label>
          <input
            type="number"
            name="familyDiscount"
            value={formData.familyDiscount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Package</button>
      </form>
    </div>
  );
}

export default AddPackage;
