import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AddTimeSlot from "../components/AddTimeSlot";
import ViewAllDoctorAppointments from "../components/ViewAllDoctorAppointments";

function AppointmentsPage() {
  const [selectedOption, setSelectedOption] = useState("null");

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = (option) => {
    switch (option) {
      case "null":
        return (
          <>
            <Typography
              component="h1"
              variant="h4"
              style={{
                height: "15%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                color: "white",
                backgroundColor: "#0076c0",
                borderRadius: "5px 5px 0 0",
              }}
            >
              Appointments
            </Typography>
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
                  flexDirection: "column",
                  alignItems: "center",
                  width: "40%",
                  height: "70%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "5px",
                }}
              >
                {/* Image in the top half */}
                <div style={{ width: "100%", height: "55.6%" }}>
                  <img
                    src="../src/assets/timeslot.jpg" // Add your image path here
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "5px 5px 0 0",
                    }}
                  />
                </div>
                <Typography variant="body1" sx={{ paddingTop: "10px" }}>
                  view or add more available <br /> slots for your patients
                </Typography>
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Button in the bottom half */}
                  <Button
                    style={{
                      width: "50%",
                      height: "auto",
                    }}
                    variant="contained"
                    onClick={() => handleSelect("addtimeslot")}
                  >
                    Add New Time Slot
                  </Button>
                </div>
              </div>

              {/* Right Box */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "40%",
                  height: "70%",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "5px",
                }}
              >
                {/* Image in the top half */}
                <div style={{ width: "100%", height: "60%" }}>
                  <img
                    src="../src/assets/apnt.jpg" // Add your image path here
                    alt="Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "5px 5px 0 0",
                    }}
                  />
                </div>
                <Typography variant="body1" sx={{ paddingTop: "10px" }}>
                  view, cancel, filter and <br />
                  reschedule your appointments
                </Typography>
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Button in the bottom half */}
                  <Button
                    style={{
                      width: "50%",
                      height: "auto",
                    }}
                    variant="contained"
                    onClick={() => handleSelect("viewAptmnts")}
                  >
                    Manage Appointments
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      case "addtimeslot":
        return <AddTimeSlot />;
      case "viewAptmnts":
        return <ViewAllDoctorAppointments />;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "75%",
        backgroundColor: "#FFF",
        borderRadius: "5px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      {renderComponent(selectedOption)}
    </div>
  );
}

export default AppointmentsPage;
