import { useEffect, useState } from "react";
import axios from "axios";

const HealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to API
    axios
      .get("http://localhost:8000/api/v1/packages/getPackages")
      .then((response) => {
        setHealthPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      <h2>Health Package Options</h2>
      <ul>
        {healthPackages.map((healthpackage) => (
          <li key={healthpackage._id}>
            <strong>{healthpackage.name}</strong>
            <p>Price: ${healthpackage.price}</p>
            <p>
              Doctor Session Discount:{" "}
              {healthpackage.discounts.doctorSessionDiscount}%
            </p>
            <p>
              Medicine Discount: {healthpackage.discounts.medicineDiscount}%
            </p>
            <p>
              Family Subscription Discount:{" "}
              {healthpackage.discounts.familySubscriptionDiscount}%
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthPackage;
