import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Collapse,
} from "@mui/material";

const ViewDoctorRequest = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleAccept = async (username) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/admins/approve`,
        { username }
      );
      setPendingDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== username)
      );
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error accepting doctor:", error);
    }
  };

  const handleReject = async (username) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/admins/deleteDoctor/${username}`
      );
      setPendingDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.username !== username)
      );
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    }
  };

  const handleViewDetails = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/doctordetails/${username}`
      );
      setSelectedDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pending Doctors Requests
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ overflowY: "auto", maxHeight: 400 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingDoctors.map((doctor) => (
              <React.Fragment key={doctor._id}>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => handleViewDetails(doctor.username)}
                  >
                    {doctor.username}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleAccept(doctor.username)}>
                      Accept
                    </Button>
                    <Button onClick={() => handleReject(doctor.username)}>
                      Reject
                    </Button>
                    <Button onClick={() => handleViewDetails(doctor.username)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Collapse
                      in={
                        selectedDoctor &&
                        selectedDoctor.data.username === doctor.username
                      }
                    >
                      <Box mt={3}>
                        <Typography variant="h5" gutterBottom>
                          Doctor Information:
                        </Typography>
                        <Typography>
                          <strong>Username:</strong>{" "}
                          {selectedDoctor?.data.username}
                        </Typography>
                        <Typography>
                          <strong>Name:</strong> {selectedDoctor?.data.name}
                        </Typography>
                        <Typography>
                          <strong>Email:</strong> {selectedDoctor?.data.email}
                        </Typography>
                        <Typography>
                          <strong>Date of Birth:</strong>{" "}
                          {selectedDoctor?.data.dateOfBirth}
                        </Typography>
                        <Typography>
                          <strong>Speciality:</strong>{" "}
                          {selectedDoctor?.data.speciality}
                        </Typography>
                        <Typography>
                          <strong>Hourly Rate:</strong>{" "}
                          {selectedDoctor?.data.hourlyRate}
                        </Typography>
                        <Typography>
                          <strong>Affiliation:</strong>{" "}
                          {selectedDoctor?.data.affiliation}
                        </Typography>
                        <Typography>
                          <strong>Educational Background: </strong>
                          {selectedDoctor?.data.educationalBackground}
                        </Typography>
                        {/* Add other doctor details as needed */}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewDoctorRequest;
