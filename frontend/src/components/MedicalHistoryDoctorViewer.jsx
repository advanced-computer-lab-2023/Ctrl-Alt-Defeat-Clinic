import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalHistoryDoctorViewer = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [medicalHistoryPaths, setMedicalHistoryPaths] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/doctors/viewPatients', {withCredentials: true});
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  // Fetch medical history paths when the selected patient changes
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        if (selectedPatient) {
          const response = await axios.get(`http://localhost:8000/api/v1/doctors/getPatientMedicalHistory?patientId=${selectedPatient}`, {withCredentials: true});
          setMedicalHistoryPaths(response.data.medicalHistory);
        }
      } catch (error) {
        console.error('Error fetching medical history:', error);
        setError('Error fetching medical history');
      }
    };

    fetchMedicalHistory();
  }, [selectedPatient]);

  return (
    <div>
      <h2>Medical History Viewer</h2>

      {/* Dropdown to select a patient */}
      <label>Select a Patient: </label>
      <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
        <option value="" disabled>Select a patient</option>
        {patients.map((patient) => (
          <option key={patient._id} value={patient._id}>{patient.name}</option>
        ))}
      </select>

      {/* Display medical history files for the selected patient */}
      <div>
        {error && <p>{error}</p>}
        <h3>Medical History</h3>
        {medicalHistoryPaths && medicalHistoryPaths.length > 0 ? (
            medicalHistoryPaths.map((path, index) => (
            <div key={index}>
                <a href={`http://localhost:8000/api/v1/patients/${path}`} target="_blank" rel="noopener noreferrer">
                File {index + 1}
                </a>
            </div>
            ))
        ) : (
            <p>No medical history files found.</p>
        )}
      </div>
    </div>
  );
};

export default MedicalHistoryDoctorViewer;
