import React, { useState } from "react";
import Axios from "axios";

function AddPackage() {
  const [res, setRes] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.packageName,
      price: formData.price,
      discounts: {
        doctorSessionDiscount: formData.doctorDiscount,
        medicineDiscount: formData.medicalDiscount,
        familySubscriptionDiscount: formData.familyDiscount,
      },
    };
    const response = await Axios.post(
      "http://localhost:8000/api/v1/packages/addPackage",
      data
    );
    console.log(response);
    setRes(response);
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
          <label>Medicine Discount:</label>
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
      {res && <div>new package added</div>}
    </div>
  );
}

export default AddPackage;
