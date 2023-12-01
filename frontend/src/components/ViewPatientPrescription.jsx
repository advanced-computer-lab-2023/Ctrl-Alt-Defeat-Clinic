import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get('http://localhost:8000/api/v1/patients/getAllPrescriptionsForPatient', { withCredentials: true });

        // Extract the data from the response
        setPrescriptions(response.data);
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
      <h1>Patient Prescriptions</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <strong>Doctor:</strong> {prescription.doctor.name}<br />
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

export default PatientPrescriptions;
