import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";

function Home() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
          borderRadius: "5px",
        }}
      >
        <CardContent>
          {/* Replace the text with your logo */}
          <img
            src="./src/assets/el7a2ny-logo-transparent.png"
            alt="Logo"
            style={{ width: "100%" }}
          />

          {/* <Typography variant="h5" align="center" gutterBottom>
            Welcome to Ctrl-Alt-Defeat Clinic, Guest!
          </Typography> */}

          <Link to="/patients/register" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth color="primary" size="large">
              Register as Patient
            </Button>
          </Link>

          <Link to="/doctors/register" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth color="primary" size="large">
              Register as Doctor
            </Button>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth color="primary" size="large">
              Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Home;
