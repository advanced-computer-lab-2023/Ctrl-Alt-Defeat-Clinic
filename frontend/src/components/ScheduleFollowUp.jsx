import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleFollowUp = () => {
  const [patientsList, setPatientsList] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the list of registered patients and available time slots when the component mounts
    fetchPatientsList();
    fetchAvailableSlots();
  }, []);

  const fetchPatientsList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/doctors/viewPatients', { withCredentials: true });

      setPatientsList(response.data);
    } catch (error) {
      console.error('Error fetching patients list:', error);
      setErrorMessage('Error fetching patients list');
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/doctors/viewAvailableSlots', { withCredentials: true });

      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      setErrorMessage('Error fetching available time slots');
    }
  };

  const handleScheduleFollowUp = async () => {
    try {
      const response = await axios.put('http://localhost:8000/api/v1/doctors/scheduleFollowUp', {
        patientId: selectedPatient,
        dateTime: selectedSlot, // Use the selected slot as a combined date-time field
        status: 'upcoming',
      }, { withCredentials: true });

      setSuccessMessage('Follow-up scheduled successfully');
    } catch (error) {
      console.error('Error scheduling follow-up:', error);
      setErrorMessage('Error scheduling follow-up');
    }
  };

  return (
    <div>
      <h2>Schedule Follow-Up</h2>
      <label>
        Select Patient:
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select Patient</option>
          {patientsList.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.username}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select from available time slots:
        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
          <option value="">Select from available time slots</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleScheduleFollowUp}>Schedule Follow-Up</button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ScheduleFollowUp;
