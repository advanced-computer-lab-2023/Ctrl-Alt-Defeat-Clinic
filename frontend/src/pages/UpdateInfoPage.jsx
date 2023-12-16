import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function UpdateInfoPage() {
  const [email, setEmail] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [changed, setChanged] = useState(false);

  const handleChange = (field) => (e) => {
    switch (field) {
      case "email":
        setEmail(e.target.value);
        break;
      case "hourlyRate":
        setHourlyRate(e.target.value);
        break;
      case "affiliation":
        setAffiliation(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/auth/getMe", {
        withCredentials: true,
      });

      console.log(res.data.loggedIn);

      const username = res.data.loggedIn.username;

      await axios.put(
        "http://localhost:8000/api/v1/doctors/updateDoctor",
        {
          username,
          email,
          hourlyRate,
          affiliation,
        },
        { withCredentials: true }
      );

      setChanged(true);
    } catch (error) {
      console.error("Error updating doctor information:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "calc(100vh - 52px)",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
          borderRadius: "5px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          sx={{
            mt: 3,
            textAlign: "center",
            width: "50vw",
            height: "50vh",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update My Info
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="emailInput"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange("email")}
            sx={{ width: "50%" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="hourlyRateInput"
            label="Hourly Rate"
            type="number"
            variant="outlined"
            value={hourlyRate}
            onChange={handleChange("hourlyRate")}
            sx={{ width: "50%" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="affiliationInput"
            label="Affiliation"
            variant="outlined"
            value={affiliation}
            onChange={handleChange("affiliation")}
            sx={{ width: "50%" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ width: "50%" }}
          >
            Save
          </Button>

          {changed && (
            <Box mt={2}>
              <Typography variant="body1" color="success">
                done
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default UpdateInfoPage;
