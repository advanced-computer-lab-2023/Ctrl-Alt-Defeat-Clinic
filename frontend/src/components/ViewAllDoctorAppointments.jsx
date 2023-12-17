import { useState } from "react";
import Axios from "axios";
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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";

function ViewAllDoctorAppointments() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");

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

  const handleCancel = async (e, id) => {
    e.preventDefault();
    const res = await Axios.put(
      `http://localhost:8000/api/v1/appointments/cancelAppointment?appointmentId=${id}`,
      {},
      { withCredentials: true }
    );
    console.log(res.data.cancelledAppointment);
    handleSubmit(e);
  };

  const renderAppointmentsTable = () => {
    const handleRescheduleClick = (e, appointment) => {
      e.preventDefault();
      setSelectedAppointment(appointment._id);
      setOpenDialog(true);
      console.log(appointment);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
      setRescheduleDate("");
    };

    const handleRescheduleSubmit = async (e) => {
      const res = await Axios.put(
        `http://localhost:8000/api/v1/appointments/rescheduleAppointment?appointmentId=${selectedAppointment}&
        rescheduleDate=${rescheduleDate}`,
        {},
        { withCredentials: true }
      );
      console.log("Reschedule date:", res.data);
      handleSubmit(e);
      setRescheduleDate("");
      setOpenDialog(false);
    };

    return (
      <Paper
        elevation={3}
        sx={{ marginTop: 2, padding: 2, height: "100%" }}
        style={{ overflowY: "scroll" }}
      >
        <Grid container spacing={2} overflow={scrollY}>
          {appointmentInfo.map((appointment, index) => (
            <Grid item xs={6} key={index}>
              {console.log(appointment)}
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box
                    sx={{
                      width: "40%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">{appointment.patient}</Typography>
                  </Box>
                  <hr />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40%",
                    }}
                  >
                    <Typography variant="body1">
                      {new Date(appointment.date).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          appointment.status === "upcoming"
                            ? "lightgreen"
                            : appointment.status === "cancelled"
                            ? "red"
                            : "yellow",
                      }}
                    >
                      {appointment.status}
                    </Typography>
                  </Box>
                </Box>
                <Grid
                  container
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: "10px" }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<CancelIcon />}
                      onClick={(e) => handleCancel(e, appointment._id)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<ScheduleIcon />}
                      onClick={(e) => handleRescheduleClick(e, appointment)}
                    >
                      Reschedule
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Reschedule Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <TextField
              type="datetime-local"
              label="Select Date and Time"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              color="secondary"
              sx={{ color: "red" }}
            >
              Cancel
            </Button>
            <Button onClick={handleRescheduleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
      {/* <div
        sx={{
          height: "85%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
        }}
      ></div> */}
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          // justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "80%" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth sx={{ margin: "10px" }}>
              {/* <InputLabel>Start Date</InputLabel> */}
              <TextField
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ margin: "10px" }}>
              {/* <InputLabel>End Date</InputLabel> */}
              <TextField
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ margin: "10px" }}>
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ width: "max-content", margin: "10px" }}
            >
              Go
            </Button>
          </form>
        </div>
        <div style={{ width: "90%", height: "70%" }}>
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
