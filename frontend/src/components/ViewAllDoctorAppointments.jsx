import { useState } from "react";
import Axios from "axios";
// import { Typography } from "@mui/material";
import {
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

function ViewAllDoctorAppointments() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentInfo, setAppointmentInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentInformation = await Axios.get(
      `http://localhost:8000/api/v1/doctors/viewDoctorAppointments?startDate=${
        startDate ? new Date(startDate) : ""
      }&endDate=${endDate ? new Date(endDate) : ""}&status=${status}`,
      { withCredentials: true }
    );
    setAppointmentInfo(appointmentInformation.data);
  };

  const renderAppointmentsTable = () => {
    return (
      <Paper
        elevation={3}
        sx={{ marginTop: 2, padding: 2, height: "100%" }}
        style={{ overflowY: "scroll" }}
      >
        <Grid container spacing={2} overflow={scrollY}>
          {appointmentInfo.map((appointment, index) => (
            <Grid item xs={6} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="body1">
                  Date and Time: {new Date(appointment.date).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Patient: {appointment.patient}
                </Typography>
                <Typography variant="body1">
                  Status: {appointment.status}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<CancelIcon />}
                  ></Button>
                  <Button
                    variant="contained"
                    startIcon={<ScheduleIcon />}
                  ></Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          flex: "2",
          borderRadius: "5px 5px 0 0",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          backgroundColor: "#0076c0",
        }}
      >
        View All Appointments
      </Typography>
      <div
        sx={{
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
        }}
      ></div>
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ width: "40%" }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              {/* <InputLabel>Start Date</InputLabel> */}
              <TextField
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              {/* <InputLabel>End Date</InputLabel> */}
              <TextField
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
                <MenuItem value="rescheduled">Rescheduled</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              View All Appointments
            </Button>
          </form>
        </div>
        <div style={{ width: "40%", height: "70%" }}>
          {appointmentInfo &&
            appointmentInfo.length > 0 &&
            renderAppointmentsTable()}
          {!appointmentInfo ||
            (appointmentInfo.length === 0 && (
              <Typography>No appointments found.</Typography>
            ))}
        </div>
      </Box>
    </Box>
  );
}

export default ViewAllDoctorAppointments;
