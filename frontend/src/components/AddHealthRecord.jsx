import { useState } from "react";
import axios from "axios";

const AddHealthRecordForm = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [filled, setFilled] = useState(true);
  const [msg, setMsg] = useState('');

  const handleAddHealthRecord = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/v1/doctors/addHealthRecord',
        {
            patientUsername: patientUsername,
            medicines: [
              {
                name: medicineName,
                dosage: dosage,
                duration: duration,
              },
            ],
            notes: notes,
            filled: filled},
        { withCredentials: true });
            setPatientUsername(patientUsername);
            setMedicineName(medicineName);
            setDosage(dosage);
            setDuration(duration);
            setNotes(notes);
            setFilled(filled);
      const newHealthRecord = response.data;
      console.log('Health Record added successfully:', newHealthRecord);
      setMsg('Health Record added successfully!');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <label>
        Patient UserName:
        <input type="text" value={patientUsername} onChange={(e) => setPatientUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Medicine Name:
        <input type="text" value={medicineName} onChange={(e) => setMedicineName(e.target.value)} />
      </label>
      <br />
      <label>
        Dosage:
        <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} />
      </label>
      <br />
      <label>
        Duration:
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </label>
      <br />
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <br />
      <label>
        Filled:
        <input type="checkbox" checked={filled} onChange={() => setFilled(!filled)} />
      </label>
      <br />
      <button onClick={handleAddHealthRecord}>Add Health Record</button>
      <br />
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default AddHealthRecordForm  ;
