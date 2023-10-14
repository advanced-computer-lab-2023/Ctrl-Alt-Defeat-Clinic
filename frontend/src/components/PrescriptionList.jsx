import { useState } from "react";
import axios from "axios";
import PrescriptionDetails from "./PrescriptionDetails";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [username, setUsername] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all" means no filtering

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

  const handleFilterPrescriptions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/patients/filterPrescriptions?date=${filterDate}&doctorUsername=${filterDoctor}&filled=${filterStatus}` // Include patient username
      );
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error filtering prescriptions:", error);
    }
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterPrescriptions();
        }}
      >
        
        <label>Filter by Date:</label>
        <input
          type="text"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <label>Filter by Doctor:</label>
        <input
          type="text"
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        />
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Filled</option>
          <option value="false">Unfilled</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription._id}>
              <td>
                <button onClick={() => handlePrescriptionSelect(prescription)}>
                  {new Date(prescription.createdAt).toLocaleDateString()}
                </button>
              </td>
              <td>{prescription.filled ? "Filled" : "Not Filled"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PrescriptionDetails selectedPrescription={selectedPrescription} />
    </div>
  );
};

export default PrescriptionList;
