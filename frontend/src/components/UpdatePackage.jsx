import React, { useState } from "react";

function UpdatePackage() {
  const [formData, setFormData] = useState({
    packageName: "",
    updatedName: "",
    updatedPrice: "",
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
    // You can handle the update logic here, such as updating the package with the provided information.
    console.log(formData);
    // Clear the form fields after submission if needed.
    setFormData({
      packageName: "",
      updatedName: "",
      updatedPrice: "",
      doctorDiscount: "",
      medicalDiscount: "",
      familyDiscount: "",
    });
  };

  return (
    <div>
      <h2>Update Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Package Name to Update:</label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Updated Name:</label>
          <input
            type="text"
            name="updatedName"
            value={formData.updatedName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Updated Price:</label>
          <input
            type="number"
            name="updatedPrice"
            value={formData.updatedPrice}
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
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
}

export default UpdatePackage;
