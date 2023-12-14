import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";

const DeletePackage = () => {
  const [res, setRes] = useState(null);
  const [packageName, setPackageName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Axios.delete(
      "http://localhost:8000/api/v1/packages/deletePackage/" + packageName
    );
    console.log(response);
    setRes(response);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5">
          Delete Package
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="packageNameInput"
          label="Package Name to Delete"
          variant="outlined"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          required
        />
        <Button type="submit" fullWidth variant="contained">
          Delete Package
        </Button>

        {res && (
          <Box mt={2}>
            <Typography variant="body1" color="success">
              Package deleted
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DeletePackage;
