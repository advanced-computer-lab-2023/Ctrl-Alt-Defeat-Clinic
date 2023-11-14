import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchPatient() {
  const [searchName, setSearchName] = useState("");
  // const [doctorUsername, setDoctorUsername] = useState('');
  const [resultedPatients, setResultedPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/searchPatientsByName?name=${searchName}`,
        { withCredentials: true }
      );
      setResultedPatients(response.data);
    } catch (error) {
      console.error("Error searching patients:", error);
    }
  };

  const handleSelectPatient = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/viewPatientInfo?id=${e.target.id}`
      );
      setSelectedPatient(response.data);
    } catch (error) {
      console.error("Error fetching selected patient:", error);
    }
  };

  return (
    <div>
      <h2>Search Patient by name</h2>
      {/* <label>Doctor username:</label>
      <input
        type="text"
        value={doctorUsername}
        onChange={(e) => setDoctorUsername(e.target.value)}
      />
      <br /> */}
      <label>Patient Name</label>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <br />
      <button onClick={handleSearch}>Search</button>
      <h3>Search result:</h3>
      <div>
        {resultedPatients.map((patient) => (
          <button
            key={patient._id}
            id={patient._id}
            onClick={handleSelectPatient}
          >
            {patient.name}
          </button>
        ))}
      </div>
      {selectedPatient && (
        <>
          <h3>Selected Patient:</h3>
          <p>Name: {selectedPatient.patient.name}</p>
          <p>Username: {selectedPatient.patient.username}</p>
          <p>Email: {selectedPatient.patient.email}</p>
          <p>Phone: {selectedPatient.patient.mobileNumber}</p>
          <p>Date of birth: {selectedPatient.patient.dateOfBirth}</p>
          <p>Gender: {selectedPatient.patient.gender}</p>
          <p>
            Emergency contact name:{" "}
            {selectedPatient.patient.emergencyContact.fullName}
          </p>
          <p>
            Emergency contact phone:{" "}
            {selectedPatient.patient.emergencyContact.mobileNumber}
          </p>
          <h5>Patient appointments:</h5>
          {selectedPatient.appointments.length > 0 ? (
            <ul>
              {selectedPatient.appointments.map((appointment) => (
                <li key={appointment._id}>
                  <p>date & time: {appointment.date}</p>
                  <p>doctor: {appointment.doctor}</p>
                  <p>status: {appointment.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments</p>
          )}
          <h5>Patient prescriptions:</h5>
          {selectedPatient.prescriptions.length > 0 ? (
            <ul>
              {selectedPatient.prescriptions.map((prescription) => (
                <li key={prescription._id}>
                  <p>date: {prescription.createdAt}</p>
                  <p>doctor: {prescription.doctor.username}</p>
                  <p>medicines: </p>
                  <ul>
                    {prescription.medicines.map((medicine) => (
                      <li key={medicine._id}>
                        <p>name: {medicine.name}</p>
                        <p>dosage: {medicine.dosage}</p>
                        <p>duration: {medicine.duration}</p>
                      </li>
                    ))}
                  </ul>
                  <p>notes: {prescription.notes}</p>
                  <p>filled: {prescription.filled ? "filled" : "unfilled"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions</p>
          )}
        </>
      )}
      <Link to="/doctors/home">Home</Link>
    </div>
  );
}

export default SearchPatient;
