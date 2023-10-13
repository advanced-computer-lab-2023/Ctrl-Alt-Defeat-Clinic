import React from "react";

const HealthPackage = () => {
  // Define your health package options here
  const healthPackages = [
    { id: 1, name: "Basic Health Package", details: "Includes basic checkup" },
    {
      id: 2,
      name: "Premium Health Package",
      details: "Includes full checkup and tests",
    },
    // Add more health packages here
  ];

  return (
    <div>
      <h2>Health Package Options</h2>
      <ul>
        {healthPackages.map((HealthPackage) => (
          <li key={HealthPackage.id}>
            <strong>{HealthPackage.name}</strong>
            <p>{HealthPackage.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthPackage;
