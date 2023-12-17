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
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/admins/add",
        formData
      );
      setRes(response);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleAlertClose = () => {
    setRes(null);
    if (res.data && res.data.status === "success") {
      navigate("/admins/home");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h2" variant="h5">
          Add Admin
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
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add Admin
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
      </div>
    </Container>
  );
};

export default AddAdmin;
