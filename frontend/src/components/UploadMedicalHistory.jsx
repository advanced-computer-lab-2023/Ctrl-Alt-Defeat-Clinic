import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UploadMedicalHistory = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("myFile", file);

      const response = await axios.post(
        "http://localhost:8000/api/v1/patients/uploadFile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("File uploaded successfully");
      } else {
        const data = response.data;
        setMessage(`Error uploading file: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/patients/home">Home</Link>
    </div>
  );
};

export default UploadMedicalHistory;
