import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get('http://localhost:8000/api/v1/doctors/viewAllPrescriptionsByDoctor', { withCredentials: true });

        // Extract the data from the response
        const { success, prescriptions } = response.data;

        if (success) {
          setPrescriptions(prescriptions);
        } else {
          setError('Failed to fetch prescriptions');
        }
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Internal server error');
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchPrescriptions function
    fetchPrescriptions();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Prescriptions</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <strong>Medicines:</strong> {prescription.medicines.map((med) => `${med.name} (${med.dosage}, ${med.duration})`).join(', ')}<br />
            <strong>Notes:</strong> {prescription.notes}<br />
            <strong>Filled:</strong> {prescription.filled ? 'Yes' : 'No'}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionList;
