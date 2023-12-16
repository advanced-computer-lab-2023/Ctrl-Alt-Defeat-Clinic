import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function MyPatientsPage() {
  const [myPatients, setMyPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewRecordsDialogOpen, setViewRecordsDialogOpen] = useState(false);
  const [viewFilesDialogOpen, setViewFilesDialogOpen] = useState(false);
  const [viewPatientDialogOpen, setViewPatientDialogOpen] = useState(false);
  const [viewPrescDialogOpen, setViewPrescDialogOpen] = useState(false);
  const [medicalHistoryPaths, setMedicalHistoryPaths] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [status, setStatus] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [med, setMed] = useState({ name: "", dosage: "", duration: "" });
  const [notes, setNotes] = useState("");
  const [filled, setFilled] = useState(false);
  const [addMedicineDialogOpen, setAddMedicineDialogOpen] = useState(false);
  const [addPrescDialogueOpen, setAddPrescDialogueOpen] = useState(false);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        if (selectedPatient) {
          console.log(
            "🚀 ~ file: MyPatientsPage.jsx:32 ~ fetchMedicalHistory ~ selectedPatient:",
            selectedPatient
          );
          const response = await axios.get(
            `http://localhost:8000/api/v1/doctors/getPatientMedicalHistory?patientId=${selectedPatient._id}`,
            { withCredentials: true }
          );
          setMedicalHistoryPaths(response.data.medicalHistory);
        }
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [selectedPatient]);

  const handleSearch = async (val) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/searchPatientsByName?name=${val}`,
        { withCredentials: true }
      );
      setMyPatients(response.data);
      console.log(
        "🚀 ~ file: MyPatientsPage.jsx:64 ~ handleSearch ~ response.data:",
        response.data
      );
    } catch (error) {
      console.error("Error searching patients:", error);
    }
  };

  const handleSelectPatient = async (patientId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/doctors/viewPatientInfo?id=${patientId}`
      );
      setSelectedPatient(response.data.patient);
      //   fetchMedicalHistory();
      setViewRecordsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching selected patient:", error);
    }
  };

  const handleUploadRecords = () => {
    setUploadDialogOpen(true);
  };

  //   const handleViewPresc = () => {
  //     setViewPrescDialogOpen(false);
  //   };

  const handleViewFiles = () => {
    setViewFilesDialogOpen(true);
  };

  const handleMoreInfo = (e, patient) => {
    e.preventDefault();
    setSelectedPatient(patient);
    setViewPatientDialogOpen(true);
  };

  const handlePatientDialogClose = () => {
    setViewPatientDialogOpen(false);
  };

  const handleAddPrescription = async () => {
    const patientId = selectedPatient._id;
    try {
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

  const getPatientsWithUpcomingAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/appointments/filterPatients?doctorUsername=${loggedIn.username}`
      );

      setMyPatients(response.data);
      console.log(
        "🚀 ~ file: MyPatientsPage.jsx:99 ~ getPatientsWithUpcomingAppointments ~ response.data:",
        response.data
      );
    } catch (error) {
      console.error(
        "Error fetching patients with upcoming appointments:",
        error
      );
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:8000/api/v1/auth/getMe", {
        withCredentials: true,
      });
      setLoggedIn(res.data.loggedIn);
      setMyPatients([...res.data.loggedIn.registeredPatients]);
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "75%",
        backgroundColor: "#FFF",
        borderRadius: "5px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          height: "15%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          borderRadius: "5px 5px 0 0",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          backgroundColor: "#0076c0",
        }}
      >
        My Patients
      </Typography>
      <div
        style={{
          height: "85%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "20%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ margin: "10px" }}>
            <TextField
              type="text"
              value={searchName}
              label="Search by name"
              onChange={(e) => {
                if (e.target.value != "") {
                  console.log(
                    "🚀 ~ file: MyPatientsPage.jsx:189 ~ MyPatientsPage ~ e.target.value:",
                    e.target.value
                  );
                  setSearchName(e.target.value);
                  handleSearch(e.target.value);
                } else {
                  setSearchName(e.target.value);
                  console.log(`in search's else`);
                  setMyPatients([...loggedIn.registeredPatients]);
                }
              }}
              fullWidth
            />
          </FormControl>

          <FormControl sx={{ margin: "10px", width: "200px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => {
                if (e.target.value === "upcoming") {
                  setStatus(e.target.value);
                  console.log(
                    "🚀 ~ file: MyPatientsPage.jsx:187 ~ MyPatientsPage ~ e.target.value:",
                    e.target.value
                  );
                  getPatientsWithUpcomingAppointments();
                } else {
                  setStatus(e.target.value);
                  console.log(
                    "🚀 ~ file: MyPatientsPage.jsx:194 ~ MyPatientsPage ~ e.target.value:",
                    e.target.value
                  );
                  setMyPatients([...loggedIn.registeredPatients]);
                }
              }}
              fullWidth
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {myPatients.map((patient) => (
            <Card
              key={patient._id}
              sx={{
                borderRadius: "5px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                marginBottom: "16px",
                border: "1px solid lightgray",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {patient.username}
                </Typography>
                <hr />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    onClick={() => handleSelectPatient(patient._id)}
                    startIcon={<VisibilityIcon />}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "80%" }}
                  >
                    Records
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      More
                    </Typography>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={(e) => handleMoreInfo(e, patient)}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog
        open={viewRecordsDialogOpen}
        onClose={() => setViewRecordsDialogOpen(false)}
      >
        <DialogTitle>Records</DialogTitle>
        <DialogActions>
          <Button onClick={handleUploadRecords} variant="contained">
            Upload Records
          </Button>
          <Button onClick={handleViewFiles} variant="contained" color="primary">
            View Records
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload Records</DialogTitle>
        <DialogContent>
          <TextField type="file" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUploadRecords}
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={viewFilesDialogOpen}
        onClose={() => setViewFilesDialogOpen(false)}
        maxWidth="md"
      >
        <DialogTitle>Medical Records</DialogTitle>
        <DialogContent>
          {medicalHistoryPaths && medicalHistoryPaths.length > 0 ? (
            medicalHistoryPaths.map((path, index) => (
              <div key={index}>
                <a
                  href={`http://localhost:8000/api/v1/patients/${path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  File {index + 1}
                </a>
              </div>
            ))
          ) : (
            <p>No medical history files found.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setViewFilesDialogOpen(false)}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={viewPrescDialogOpen}
        onClose={() => setViewFilesDialogOpen(false)}
        maxWidth="md"
        sx={{ width: "100%" }}
      >
        <DialogTitle>Prescriptions</DialogTitle>
        <DialogContent
          sx={{
            width: "500px", // Adjust the width as needed
            height: "500px", // Adjust the height as needed
          }}
        >
          prescs
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setViewPrescDialogOpen(false)}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
          <Button
            onClick={() => setAddPrescDialogueOpen(true)}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addMedicineDialogOpen}
        onClose={() => {
          setAddMedicineDialogOpen(false);
        }}
      >
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <TextField
            label="Medicine Name"
            value={med.name}
            onChange={(e) => setMed({ ...med, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dosage"
            value={med.dosage}
            onChange={(e) => setMed({ ...med, dosage: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Duration"
            value={med.duration}
            onChange={(e) => setMed({ ...med, duration: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddMedicineDialogOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setMedicines([...medicines, med]);
              setAddMedicineDialogOpen(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addPrescDialogueOpen}
        onClose={() => {
          setAddPrescDialogueOpen(false);
        }}
      >
        <DialogTitle>Medicine List</DialogTitle>
        <DialogContent>
          {medicines.length === 0 ? (
            <p>No medicines added.</p>
          ) : (
            <List>
              {medicines.map((medicine, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={medicine.name}
                    secondary={`Dosage: ${medicine.dosage}, Duration: ${medicine.duration}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAddPrescDialogueOpen(false);
              setMedicines([]);
            }}
            color="primary"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              setAddMedicineDialogOpen(true);
            }}
            color="primary"
          >
            Add Medicine
          </Button>
        </DialogActions>
      </Dialog>

      {viewPatientDialogOpen && selectedPatient && (
        <Dialog
          open={viewPatientDialogOpen}
          onClose={handlePatientDialogClose}
          maxWidth="md"
        >
          <DialogTitle variant="h4">Patient Details</DialogTitle>
          <DialogContent>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {selectedPatient.username}
            </Typography>
            <hr />
            <Typography variant="body1">
              Name: {selectedPatient.name}
            </Typography>
            <hr />
            <Typography variant="body1">
              Email: {selectedPatient.email}
            </Typography>
            <hr />
            <Typography variant="body1">
              Date of Birth:{" "}
              {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
            </Typography>
            <hr />
            <Typography variant="body1">
              National ID: {selectedPatient.nationalId}
            </Typography>
            <hr />
            <Typography variant="body1">
              Gender: {selectedPatient.gender}
            </Typography>
            <hr />
            <Typography variant="body1">
              Mobile Number: {selectedPatient.mobileNumber}
            </Typography>
            <hr />
            <Typography variant="body1">Emergency Contact:</Typography>
            <Box marginLeft="2rem">
              <Typography variant="body1">
                Full Name: {selectedPatient.emergencyContact.fullName}
              </Typography>
              <Typography variant="body1">
                Mobile Number: {selectedPatient.emergencyContact.mobileNumber}
              </Typography>
            </Box>
            <hr />
            {selectedPatient.healthPackage ? (
              <Box>
                <Typography variant="body1">
                  Health Package: {selectedPatient.healthPackage}
                </Typography>
                <Typography variant="body1">
                  Health Package Status: {selectedPatient.healthPackageStatus}
                </Typography>
                <Typography variant="body1">
                  Health Package Renewal Date:{" "}
                  {selectedPatient.healthPackageRenewalDate}
                </Typography>
                <Typography variant="body1">
                  Health Package End Date:{" "}
                  {selectedPatient.healthPackageEndDate}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1">
                not subscribed to a health package
              </Typography>
            )}
            <hr />
            {selectedPatient.familyMembers.length > 0 ? (
              <Typography variant="body1">Family Members:</Typography>
            ) : (
              <Typography variant="body1">
                no family members registered
              </Typography>
            )}
            <Box marginLeft="2rem">
              {selectedPatient.familyMembers.map((familyMember, index) => (
                <Typography key={index} variant="body1">
                  Family Member {index + 1}: {familyMember}
                </Typography>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                console.log("clicked presc");
                setViewPrescDialogOpen(true);
              }}
              variant="contained"
              color="primary"
            >
              Prescriptions
            </Button>
            <Button
              onClick={handlePatientDialogClose}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default MyPatientsPage;
