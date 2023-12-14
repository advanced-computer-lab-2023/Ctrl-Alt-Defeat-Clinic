import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function AddTimeSlot() {
  const [res, setRes] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.put(
      `http://localhost:8000/api/v1/doctors/addAvailableSlot?slotDate=${dateTime}`,
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    setOpenSnackbar(true);
    setRes(response.data);
  };

  const handleToggle = () => {
    setToggle(true);
  };

  useEffect(() => {
    (async () => {
      const response = await Axios.get(
        `http://localhost:8000/api/v1/doctors/viewAvailableSlots`,
        { withCredentials: true }
      );
      console.log(response.data);
      setAvailableSlots(response.data);
    })();
  }, [res]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "15%",
          width: "100%",
          display: "flex",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          backgroundColor: "#0076c0",
          borderRadius: "5px 5px 0 0",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ backgroundColor: "white" }}
            onClick={handleToggle}
          >
            Back
          </Button>
        </div>
        <Typography
          component="h1"
          variant="h4"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            flex: "2",
          }}
        >
          Add New Time Slot
        </Typography>
        <div
          style={{
            flex: "1",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "85%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "40%",
            height: "70%",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              height: "85%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <label style={{ margin: "10px" }}>Select a date</label>
                <TextField
                  type="datetime-local"
                  name="dateTime"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  required
                  style={{ margin: "10px" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: "10px" }}
                >
                  Add Time Slot
                </Button>
              </div>
            </form>
          </div>

          {/* Snackbar for Success Message */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000} // Adjust as needed
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="success"
            >
              Time slot added successfully
            </MuiAlert>
          </Snackbar>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "40%",
            height: "70%",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          <Typography
            component="h4"
            variant="h5"
            style={{
              height: "15%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            My Available Slots
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              height: "85%",
              overflowY: "scroll",
              padding: "10px",
            }}
          >
            {availableSlots.map((slot) => {
              return (
                <div
                  key={slot}
                  style={{
                    width: "60%",
                    height: "50px",
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {new Date(slot).toLocaleString()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimeSlot;
