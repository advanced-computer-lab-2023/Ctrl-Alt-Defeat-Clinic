import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import Axios from "axios";

const RemoveDoctor = () => {
  const [username, setUsername] = useState("");
  const [res, setRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.delete(
        `http://localhost:8000/api/v1/admins/deleteDoctor/${username}`
      );
      setRes(response);
    } catch (error) {
      console.error("Error removing doctor:", error);
    }
  };

  const handleAlertClose = () => {
    setRes(null);
    if (res && res.data && res.data.status === "success") {
      // You may want to redirect or take additional actions upon success
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h2" variant="h5">
          Remove Doctor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Remove Doctor
          </Button>
        </form>
        {res && (
          <Snackbar
            open={Boolean(res)}
            autoHideDuration={3000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleAlertClose}
              severity={
                res.data && res.data.status === "success" ? "success" : "error"
              }
              sx={{ width: "100%" }}
            >
              {res.data && res.data.message}
            </Alert>
          </Snackbar>
        )}
        {/* <Link to="/admins/home">Home</Link> */}
      </div>
    </Container>
  );
};

export default RemoveDoctor;
