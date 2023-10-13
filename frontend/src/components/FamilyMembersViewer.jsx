import { useState } from "react";
import axios from "axios";

function FamilyMembersViewer() {
  const [username, setPatientId] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleViewFamilyMembers = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Fetch family members when the button is clicked
    axios
      .get(
        `http://localhost:8000/api/v1/patients/viewFamilyMembers/?username=${username}`
      )
      .then((response) => {
        setFamilyMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching family members:", error);
      });
  };

  return (
    <div>
      <h1>Family Member Viewer</h1>
      <form onSubmit={handleViewFamilyMembers}>
        <label>Patient Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button type="submit">View Family Members</button>
      </form>

      <div>
        <h2>Registered Family Members</h2>
        <ul>
          {familyMembers.map((member) => (
            <li key={member._id}>
              <h3>Name: {member.name}</h3>
              <p>National ID: {member.nationalId}</p>
              <p>Age: {member.age}</p>
              <p>Gender: {member.gender}</p>
              <p>Relation to Patient: {member.relationToPatient}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FamilyMembersViewer;
