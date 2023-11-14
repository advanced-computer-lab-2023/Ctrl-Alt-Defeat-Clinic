import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteMedicalHistory = () => {
  const [filePaths, setFilePaths] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of file paths when the component mounts
    const fetchFileList = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/patients/getAllMedicalHistory', {
          withCredentials: true,
        });

        if (response.status === 200) {
          setFilePaths(response.data.medicalHistory);
        } else {
          setMessage('Error fetching file list');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An unexpected error occurred.');
      }
    };

    fetchFileList();
  }, []); // Run the effect only once when the component mounts

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!selectedFilePath) {
      setMessage('Please select a file to delete.');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:8000/api/v1/patients/deleteMedicalHistory', {
        data: { filePath: selectedFilePath },
        withCredentials: true,
      });

      if (response.status === 200) {
        setMessage('File deleted successfully');
        // Update the file paths after deletion
        setFilePaths((prevFilePaths) => prevFilePaths.filter((path) => path !== selectedFilePath));
        setSelectedFilePath(''); // Clear the selected file path
      } else {
        const data = response.data;
        setMessage(`Error deleting file: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedFilePath(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleDelete}>
        <label>
          Select File to Delete:
          <select value={selectedFilePath} onChange={handleDropdownChange}>
            <option value="" disabled>Select a file</option>
            {filePaths.map((path, index) => (
              <option key={index} value={path}>{path}</option>
            ))}
          </select>
        </label>
        <button type="submit">Delete File</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteMedicalHistory;
