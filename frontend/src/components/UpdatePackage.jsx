import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function UpdatePackage() {
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    packageName: "",
    updatedName: "",
    updatedPrice: "",
    doctorDiscount: "",
    medicalDiscount: "",
    familyDiscount: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.updatedName,
      price: formData.updatedPrice,
      discounts: {
        doctorSessionDiscount: formData.doctorDiscount,
        medicineDiscount: formData.medicalDiscount,
        familySubscriptionDiscount: formData.familyDiscount,
      },
    };
    const response = await Axios.put(
      "http://localhost:8000/api/v1/packages/updatePackage/" +
        formData.packageName,
      data
    );
    console.log(response);
    setRes(response);
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
      {res && <div>package updated</div>}
      <Link to="/admins/home">Home</Link>
    </div>
  );
}

export default UpdatePackage;
