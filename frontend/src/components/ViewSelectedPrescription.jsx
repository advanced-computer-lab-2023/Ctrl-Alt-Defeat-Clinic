import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const ViewSelectedPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const prescriptionDetailsRef = useRef(null);

  useEffect(() => {
    // Fetch prescriptions on component mount
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/patients/getPrescriptionsForPatient",
        { withCredentials: true });

      setPrescriptions(response.data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const handlePrescriptionChange = (prescriptionId) => {
    // Find the selected prescription from the list
    const selected = prescriptions.find(prescription => prescription._id === prescriptionId);

    // Set the selected prescription in the state
    setSelectedPrescription(selected);
  };

  const handleDownloadPDF = () => {
    if (!selectedPrescription || !prescriptionDetailsRef.current) {
      return;
    }

    // Convert prescription details to PDF using html2pdf
    html2pdf(prescriptionDetailsRef.current, {
      margin: 10,
      filename: `prescription_${selectedPrescription._id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  return (
    <div>
      <label htmlFor="prescriptionDropdown">Select Prescription:</label>
      <select
        id="prescriptionDropdown"
        onChange={(e) => handlePrescriptionChange(e.target.value)}
        value={selectedPrescription ? selectedPrescription._id : ''}
      >
        <option value="">Select a Prescription</option>
        {prescriptions.map((prescription) => (
          <option key={prescription._id} value={prescription._id}>
            Prescription {prescription._id}
          </option>
        ))}
      </select>

      <button onClick={handleDownloadPDF}>Download Prescription as PDF</button>

      {selectedPrescription && (
        <div ref={prescriptionDetailsRef}>
          <h2>Prescription Details</h2>
          <p>Doctor: {selectedPrescription.doctor.name}</p>
          <p>Medicines: {JSON.stringify(selectedPrescription.medicines)}</p>
          <p>Notes: {selectedPrescription.notes}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default ViewSelectedPrescription;
