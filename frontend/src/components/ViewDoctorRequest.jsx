import { useState, useEffect } from "react";
import axios from "axios";

const ViewDoctorRequest = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    // Fetch the pending doctors when the component mounts
    const fetchPendingDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admins/pendingdoctors"
        );
        setPendingDoctors(response.data);
      } catch (error) {
        console.error("Error fetching pending doctors:", error);
      }
    };

    fetchPendingDoctors();
  }, []); // Empty dependency array to ensure the effect runs only once

  // ... (Previous code remains unchanged)

  const handleAccept = async (username) => {
    try {
      // Call the approveDoctor API with the username
      const response = await axios.put(
        `http://localhost:8000/api/v1/admins/approve`,
        {
          username,
        }
      ); // Update the URL accordingly
      console.log(response.data);
      // Update the state to remove the accepted doctor from the array
      setPendingDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== username)
      );

      // Clear selectedDoctor when a doctor is accepted
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error accepting doctor:", error);
    }
  };

  // ... (Remaining code remains unchanged)

  const handleReject = async (username) => {
    try {
      // Call the deleteDoctor API with the username
      await axios.delete(
        `http://localhost:8000/api/v1/admins/deleteDoctor/${username}`
      ); // Update the URL accordingly
      // Remove the rejected doctor from the pendingDoctors array
      setPendingDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== username)
      );
      // Clear selectedDoctor when a doctor is rejected
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  const handleViewDetails = async (username) => {
    try {
      // Fetch doctor details when "View Details" button is clicked
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/doctordetails/${username}`
      ); // Update the URL accordingly
      setSelectedDoctor(response.data);
      console.log(response.data);
      console.log(selectedDoctor);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  return (
    <div>
      <h2>Pending Doctors Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Accept</th>
            <th>Reject</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {pendingDoctors.map((doctor) => (
            <tr key={doctor._id}>
              <td onClick={() => handleViewDetails(doctor.username)}>
                <div>{doctor.username}</div>
              </td>
              <td>
                <button onClick={() => handleAccept(doctor.username)}>
                  Accept
                </button>
              </td>
              <td>
                <button onClick={() => handleReject(doctor.username)}>
                  Reject
                </button>
              </td>
              <td>
                <button onClick={() => handleViewDetails(doctor.username)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDoctor && (
        <div>
          <h3>Doctor Information:</h3>
          <p>
            <strong>Username:</strong> {selectedDoctor.data.username}
          </p>
          <p>
            <strong>Name:</strong> {selectedDoctor.data.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedDoctor.data.email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {selectedDoctor.data.dateOfBirth}
          </p>
          <p>
            <strong>Speciality:</strong> {selectedDoctor.data.speciality}
          </p>
          <p>
            <strong>Hourly Rate:</strong> {selectedDoctor.data.hourlyRate}
          </p>
          <p>
            <strong>Aflliation:</strong> {selectedDoctor.data.affiliation}
          </p>
          <p>
            <strong>Educational Background: </strong>{" "}
            {selectedDoctor.data.educationalBackground}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewDoctorRequest;
