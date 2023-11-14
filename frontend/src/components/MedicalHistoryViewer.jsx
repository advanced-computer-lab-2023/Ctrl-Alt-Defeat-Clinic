import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MedicalHistoryViewer = () => {
  const [medicalHistoryPaths, setMedicalHistoryPaths] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicalHistoryPaths = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/patients/getAllMedicalHistory",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setMedicalHistoryPaths(response.data.medicalHistory);
      } catch (error) {
        console.error("Error fetching medical history paths:", error);
        setError("Error fetching medical history paths");
      }
    };

    fetchMedicalHistoryPaths();
  }, []);

  return (
    <div>
      <h2>Medical History</h2>

      {error && <p>{error}</p>}
      {medicalHistoryPaths && medicalHistoryPaths.length > 0 ? (
        medicalHistoryPaths.map((path, index) => (
          <div key={index}>
            <a
              href={`http://localhost:8000/api/v1/patients/${path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              File {index + 1}
            </a>
          </div>
        ))
      ) : (
        <p>No medical history files found.</p>
      )}
      <Link to="/patients/home">Home</Link>
    </div>
  );
};

export default MedicalHistoryViewer;
