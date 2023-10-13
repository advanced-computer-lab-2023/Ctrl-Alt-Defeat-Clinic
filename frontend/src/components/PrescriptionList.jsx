import { useState } from "react";
import axios from "axios";

import PrescriptionDetails from "./PrescriptionDetails";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [username, setUsername] = useState("");

  const handleFetchPrescriptions = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/patients/getAllPrescriptionsForPatient?username=${username}`
      );
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handlePrescriptionSelect = (prescription) => {
    setSelectedPrescription(prescription);
  };

  return (
    <div>
      <h2>Your Prescriptions</h2>
      <form onSubmit={handleFetchPrescriptions}>
        <label>Enter Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Fetch Prescriptions</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(
            (prescription) => (
              console.log(prescription),
              (
                <tr key={prescription._id}>
                  <td>
                    <button
                      onClick={() => handlePrescriptionSelect(prescription)}
                    >
                      {prescription.createdAt}
                    </button>
                  </td>
                  <td>{prescription.filled ? "Filled" : "Not Filled"}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      <PrescriptionDetails selectedPrescription={selectedPrescription} />
    </div>
  );
};

export default PrescriptionList;
