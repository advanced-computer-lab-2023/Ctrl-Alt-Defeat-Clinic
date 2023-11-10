import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionForm = ({ patientId }) => {
  const [healthPackageId, setHealthPackageId] = useState('');
  const [healthPackages, setHealthPackages] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('');

  
  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/packages/getPackages');
        console.log('Health Packages:', response.data);
        setHealthPackages(response.data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
      }
    };

    const fetchFamilyMember = async () => {
      const username = 'patient2';
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/patients/viewFamilyMembers/?username=${username}`);
        console.log('Family member:', response.data);
        setFamilyMembers(response.data);
      } catch (error) {
        console.error('Error fetching family member:', error);
      }
    }
  
    fetchHealthPackages();
    fetchFamilyMember();
  }, []);



  const handleSubscribe = async () => {
    const patientId = '651eeac7f21f9b5864b17e9d';
    try {
      const response = await axios.post('http://localhost:8000/api/v1/patients/subscribeToHealthPackage', {
        patientId,
        healthPackageId,
      });
  
      if (response.status === 200) {
        console.log('Subscription successful');
        // Handle success, update UI, etc.
      }
    } catch (error) {
      console.error('Error during subscription:', error);     
    }
  };

  return (
    <div>
      <label>Select Health Package:</label>
      <select value={healthPackageId} onChange={(e) => setHealthPackageId(e.target.value)}>
        <option value="" disabled>Select a package</option>
        {healthPackages.map((healthPackage) => (
          <option key={healthPackage._id} value={healthPackage._id}>
            {healthPackage.name} - ${healthPackage.price}
          </option>
        ))}
      </select>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default SubscriptionForm;

