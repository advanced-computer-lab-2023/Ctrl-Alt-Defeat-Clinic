import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="currentPasswordInput"
            label="Enter your current password"
            type="password"
            variant="outlined"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
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
          />
          <Button type="submit" fullWidth variant="contained">
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
