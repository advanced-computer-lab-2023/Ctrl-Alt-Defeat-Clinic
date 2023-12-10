/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Snackbar, Alert, InputAdornment } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [msg, setMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({
      username: Boolean(!username),
      password: Boolean(!password),
    });
    if (!username || !password) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );
      setMsg({
        type: "success",
        text: "success! Redirecting you to home...",
      });
      setTimeout(() => {
        if (response.data.role === "admin") {
          navigate("/admins/home");
        } else if (response.data.role === "doctor") {
          navigate("/doctors/home");
        } else {
          navigate("/patients/home");
        }
      }, 3000);
    } catch (err) {
      if (err.response)
        setMsg({
          type: "error",
          text: err.response.data.message,
        });
    }
  };

  const containerStyle = {
    marginTop: "70px",
    borderRadius: "5px",
    padding: "25px",
    backgroundColor: "#fff",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  };

  return (
    <>
      <Typography
        variant="div"
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "18px",
          paddingX: "200px",
          marginTop: "50px",
        }}
      >
        <ArrowBackIosIcon style={{ color: "#1976d2", width: "20px" }} />
        <Link to="/">Back</Link>
      </Typography>
      <Container component="main" maxWidth="xs" style={containerStyle}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#0E4378" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              error={errors.username}
              onBlur={() =>
                setErrors({ ...errors, username: Boolean(!username) })
              }
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              helperText={errors.username ? "This field is required" : ""}
            />
            <TextField
              margin="normal"
              required
              error={errors.password}
              onBlur={() =>
                setErrors({ ...errors, password: Boolean(!password) })
              }
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockPersonIcon />
                  </InputAdornment>
                ),
              }}
              helperText={errors.password ? "This field is required" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                paddingY: 2,
                bgcolor: "#0E4378",
                ":hover": { backgroundColor: "#0E4378" },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgetPassword">forgot password</Link>
              </Grid>
              {/* <Grid style={{ display: "flex", gap: "3px" }}>
                <Typography variant="body2">Don't have an account?</Typography>
                <Link href="#" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
      {msg && (
        <Snackbar
          open={Boolean(msg)}
          autoHideDuration={3000}
          onClose={() => setMsg()}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setMsg(null)}
            severity={msg.type}
            sx={{ width: "100%" }}
          >
            {msg.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
