import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FamilyMembersViewer = () => {
  const [patient, setPatient] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [relationToPatient, setRelationToPatient] = useState("wife");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [linkingData, setLinkingData] = useState({
    phoneNumber: "",
    email: "",
    relationship: "wife",
  });
  const [addError, setAddError] = useState(null);
  const [linkError, setLinkError] = useState(null);

  const showData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/getMe",
        { withCredentials: true }
      );
      console.log(response.data);
      setPatient(response.data.loggedIn);
      setFormVisible(true);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const handleViewFamilyMembers = async (e) => {
    e.preventDefault();

    if (!patient) {
      console.error("Patient data not available.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/patients/viewFamilyMembers`,
        { withCredentials: true }
      );
      setFamilyMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const handleAddFamilyMember = async (e) => {
    e.preventDefault();

    try {
      const newFamilyMember = {
        name,
        nationalId,
        age,
        gender,
        relationToPatient,
      };

      const response = await axios.post(
        `http://localhost:8000/api/v1/patients/addMember`,
        newFamilyMember,
        { withCredentials: true }
      );

      console.log("Added family member:", response.data);

      // Reset error state
      setAddError(null);

      setName("");
      setNationalId("");
      setAge("");
      setGender("male");
      setRelationToPatient("wife");
      // After adding a family member, you may want to refresh the list of family members
      handleViewFamilyMembers(e);
    } catch (error) {
      console.error("Error adding family member:", error);
      // Set error state for display
      setAddError(
        error.response?.data?.error ||
          "An error occurred while adding a family member."
      );
    }
  };

  const handleLinkFamilyMember = async (e) => {
    e.preventDefault();

    try {
      setLinkingData({ ...linkingData });
      const response = await axios.post(
        "http://localhost:8000/api/v1/patients/linkMember",
        linkingData,
        { withCredentials: true }
      );

      console.log("Linked family member:", response.data);

      // Reset error state
      setLinkError(null);

      // Clear linking data
      setLinkingData({
        phoneNumber: "",
        email: "",
        relationship: "wife",
      });

      // Refresh the list of family members
      handleViewFamilyMembers(e);
    } catch (error) {
      console.error("Error linking family member:", error);
      // Set error state for display
      setLinkError(
        error.response?.data?.error ||
          "An error occurred while linking a family member."
      );
    }
  };

  return (
    <div>
      <h1>Family Members Manager</h1>
      {formVisible && patient && (
        <div>
          <form onSubmit={handleAddFamilyMember}>
            <h2>Add Family Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="National ID"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
            <input
              type="number"
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
            <button type="submit">Add Family Member</button>
          </form>

          {addError && <p style={{ color: "red" }}>{addError}</p>}

          <form onSubmit={handleLinkFamilyMember}>
            <h2>Link Family Member</h2>

            <input
              type="text"
              placeholder="Family Member Phone Number"
              value={linkingData.phoneNumber}
              onChange={(e) =>
                setLinkingData({ ...linkingData, phoneNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Family Member Email"
              value={linkingData.email}
              onChange={(e) =>
                setLinkingData({ ...linkingData, email: e.target.value })
              }
            />
            <select
              value={linkingData.relationship}
              onChange={(e) =>
                setLinkingData({
                  ...linkingData,
                  relationship: e.target.value,
                })
              }
            >
              <option value="wife">Wife</option>
              <option value="husband">Husband</option>
              <option value="children">Children</option>
            </select>
            <button type="submit">Link Family Member</button>
          </form>

          {linkError && <p style={{ color: "red" }}>{linkError}</p>}

          <form onSubmit={handleViewFamilyMembers}>
            <h2>View Family Members</h2>
            <button type="submit">View Family Members</button>
          </form>

          {familyMembers.length > 0 && (
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
          )}
        </div>
      )}
      <Link to="/patients/home">Home</Link>
    </div>
  );
};

export default FamilyMembersViewer;
