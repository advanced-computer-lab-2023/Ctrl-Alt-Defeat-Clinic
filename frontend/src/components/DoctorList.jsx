import { useState } from "react";
import axios from "axios";

import DoctorDetails from "./DoctorDetails";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterSpeciality, setFilterSpeciality] = useState("");
  // const [filterRegistrationStatus, setFilterRegistrationStatus] = useState(""); // "all" means no filtering
  const [filterDate, setFilterDate] = useState(""); // Add state for appointment date
  // const [filterTime, setFilterTime] = useState(""); // Add state for appointment time

  const handleFetchDoctors = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/viewAllDoctors`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleFilterDoctors = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/filterDoctors?name=${filterName}&speciality=${filterSpeciality}&date=${filterDate? new Date(filterDate) : ""}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error filtering doctors:", error);
    }
  };

  return (
    <div>
      <h2>List of Doctors</h2>
      <form onSubmit={handleFetchDoctors}>
        <label>Fetch All Doctors:</label>
        <button type="submit">Fetch Doctors</button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterDoctors();
        }}
      >
        <label>Filter by Name:</label>
        <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <label>Filter by Speciality:</label>
        <input
          type="text"
          value={filterSpeciality}
          onChange={(e) => setFilterSpeciality(e.target.value)}
        />
        <label>Filter by Available Date:</label>
        <input
          type="datetime-local"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Speciality</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>
                <button onClick={() => handleDoctorSelect(doctor)}>
                  {doctor.name}
                </button>
              </td>
              <td>{doctor.speciality}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <DoctorDetails selectedDoctor={selectedDoctor} />
    </div>
  );
};

export default DoctorList;
