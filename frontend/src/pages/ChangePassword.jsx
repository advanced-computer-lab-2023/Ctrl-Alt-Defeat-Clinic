import React, { useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changed, setChanged] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/changePassword",
      { currentPassword, newPassword },
      { withCredentials: true }
    );

    console.log(res.data);
    if (res.data.status === "success") {
      setChanged(true);
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
            height: "40vh",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="currentPasswordInput"
            label="Enter your current password"
            type="password"
            variant="outlined"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            sx={{ width: "50%" }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="newPasswordInput"
            label="Enter your new password"
            type="password"
            variant="outlined"
            value={newPassword}
            onChange={handleNewPasswordChange}
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
                Password changed successfully
              </Typography>
            </Box>
          )}
        </Box>

        {/* <Box mt={2}>
          <Link to="/">Go to login page</Link>
        </Box> */}
      </Box>
    </Container>
  );
};

export default ChangePassword;
