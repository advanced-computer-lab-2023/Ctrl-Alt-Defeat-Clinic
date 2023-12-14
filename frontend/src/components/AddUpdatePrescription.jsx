import { useState } from "react";
import axios from "axios";

const AddUpdatePrescription = () => {
  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [filled, setFilled] = useState(false);
  const [prescriptionIdToUpdate, setPrescriptionIdToUpdate] = useState("");

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", duration: "" }]);
  };

  const removeMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const handleAddPrescription = async () => {
    try {
      // Make a POST request to add a prescription
      const response = await axios.post(
        "http://localhost:8000/api/v1/doctors/addPrescription",
        {
          patientId,
          medicines,
          notes,
          filled,
        },
        { withCredentials: true }
      );

      console.log("Prescription added:", response.data);
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };

  const handleUpdatePrescription = async () => {
    try {
      // Make a PUT request to update a prescription
      const response = await axios.put(
        `http://localhost:8000/api/v1/doctors/prescription/${prescriptionIdToUpdate}/update`,
        {
          medicines,
          notes,
          filled,
        },
        { withCredentials: true }
      );

      console.log("Prescription updated:", response.data);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  return (
    <div>
      <h2>Add or Update Prescription</h2>
      <div>
        <label>
          Patient ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </label>
        <br />
        <div>
          {medicines.map((medicine, index) => (
            <div key={index}>
              <label>
                Medicine Name:
                <input
                  type="text"
                  value={medicine.name}
                  onChange={(e) =>
                    handleMedicineChange(index, "name", e.target.value)
                  }
                />
              </label>
              <label>
                Dosage:
                <input
                  type="text"
                  value={medicine.dosage}
                  onChange={(e) =>
                    handleMedicineChange(index, "dosage", e.target.value)
                  }
                />
              </label>
              <label>
                Duration:
                <input
                  type="text"
                  value={medicine.duration}
                  onChange={(e) =>
                    handleMedicineChange(index, "duration", e.target.value)
                  }
                />
              </label>
              <button onClick={() => removeMedicine(index)}>Remove</button>
            </div>
          ))}
        </div>
        <button onClick={addMedicine}>Add Medicine</button>
        <br />
        <label>
          Notes:
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <br />
        <label>
          Filled:
          <input
            type="checkbox"
            checked={filled}
            onChange={(e) => setFilled(e.target.checked)}
          />
        </label>
        <br />
        <button onClick={handleAddPrescription}>Add Prescription</button>
        <br />
        <label>
          Prescription ID to Update:
          <input
            type="text"
            value={prescriptionIdToUpdate}
            onChange={(e) => setPrescriptionIdToUpdate(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleUpdatePrescription}>Update Prescription</button>
      </div>
    </div>
  );
};

export default AddUpdatePrescription;
