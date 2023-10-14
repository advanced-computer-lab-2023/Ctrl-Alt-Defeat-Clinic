import { useState } from "react";
import axios from "axios";

const AddFamilyMember = () => {
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // Default to 'male' per your schema
  const [relationToPatient, setRelationToPatient] = useState("wife"); // Default to 'wife' per your schema
  const [patientUsername, setPatientUsername] = useState(""); // New state variable

  const handleAddFamilyMember = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const newFamilyMember = {
        name,
        nationalId,
        age,
        gender,
        relationToPatient,
      };
      // console.log("Added family member:", newFamilyMember);

      // Send a POST request to the backend API with the patient's username as a query parameter
      const response = await axios.post(
        `http://localhost:8000/api/v1/patients/addMember/?username=${patientUsername}`,
        newFamilyMember
      );

      console.log("Added family member:", newFamilyMember);
      console.log("Server response:", response.data);

      // Clear the input fields or perform other necessary actions
      setName("");
      setNationalId("");
      setAge("");
      setGender("male");
      setRelationToPatient("wife");
      setPatientUsername(""); // Clear the patient's username input field
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <div>
      <h2>Add Family Member</h2>
      <form onSubmit={handleAddFamilyMember}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number" // Change input type to number for nationalId
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <input
          type="number" // Change input type to number for age
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={relationToPatient}
          onChange={(e) => setRelationToPatient(e.target.value)}
        >
          <option value="wife">Wife</option>
          <option value="husband">Husband</option>
          <option value="children">Children</option>
        </select>
        <input
          type="text"
          placeholder="Patient's Username"
          value={patientUsername}
          onChange={(e) => setPatientUsername(e.target.value)}
        />
        <button type="submit">Add Family Member</button>
      </form>
    </div>
  );
};

export default AddFamilyMember;
