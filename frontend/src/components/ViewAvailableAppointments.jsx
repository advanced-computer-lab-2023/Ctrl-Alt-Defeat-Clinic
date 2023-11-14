import { useState, useEffect } from "react";
import Axios from "axios";

function ViewAvailableAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [slotsInfo, setSlotsInfo] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  
  const [appointment, setAppointment]  = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await Axios.get("http://localhost:8000/api/v1/doctors/viewAllDoctors" , {withCredentials: true});
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchFamilyMembers = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/api/v1/patients/viewFamilyMembers`, 
          {withCredentials: true}
        );
        setFamilyMembers(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching family members:", error);
      }
    };

    fetchDoctors();
    fetchFamilyMembers();
  }, []);

  const fetchDataAndUpdateSlots = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/patients/viewDoctorSlots?doctorUsername=${selectedDoctor}`,
        { withCredentials: true }
      );
      setSlotsInfo(response.data);
    } catch (error) {
      console.error("Error fetching Slots:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchDataAndUpdateSlots();
    setAppointment(null);
  };

  const renderSlotsTable = () => {
    return (
      <>
        <br/>
        {slotsInfo && slotsInfo.length > 0 && renderPatientSelection()}

        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Select Appointment</th>
            </tr>
          </thead>
          <tbody>
            {slotsInfo.map((dateTime, index) => (
              <tr key={index}>
                <td>{new Date(dateTime).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleSelectAppointments(dateTime)}
                    disabled={!selectedPatient}
                  >
                    Select Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const renderPatientSelection = () => {
    return (
      <div>
        <label>Select a Patient: </label>
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="" disabled>Select a patient</option>
          <option value="Me">Me</option>
          {familyMembers.message != 'No family members found for the patient' && familyMembers.map((familyMember) => (
            <option key={familyMember._id} value={familyMember.name}>
              {familyMember.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  const handleSelectAppointments = async (dateTime) => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/api/v1/appointments/addAppointment?date=${dateTime}&patient=${selectedPatient}&doctor=${selectedDoctor}`,
        {},
        { withCredentials: true }
      );
  
      console.log(response.data);
      setAppointment(response.data);
  
      await fetchDataAndUpdateSlots();
      
      //console.log(`Selected appointment at ${dateTime} for patient ${selectedPatient} with ${selectedDoctor}`);

    } catch (error) {
      console.error('Error selecting appointment:', error);
    }
  };
  

  return (
    <div>
      <h2>View Available Appointments</h2>

      <label>Select a Doctor: </label>
      <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="" disabled>Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.username} value={doctor.username}>{doctor.name}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">View Available Appointments</button>
        </div>
      </form>

      {slotsInfo && slotsInfo.length > 0 ? renderSlotsTable() : <p>No appointments found.</p>}
      <br/>
      {appointment && <div>{(appointment)}</div>}
    </div>
  );
}

export default ViewAvailableAppointments;
