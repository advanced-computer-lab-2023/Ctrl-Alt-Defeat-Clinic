import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[4],
}));

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/forgetPassword",
        { username },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        setMsg({
          type: "success",
          text: "Success! Redirecting you to verify OTP...",
        });

        setTimeout(() => {
          navigate(`/verifyOTP/${username}`);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        setMsg({
          type: "error",
          text: error.response.data.message,
        });
      }
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Typography variant="h5">Forget Password</Typography>
      <TextField
        margin="normal"
        fullWidth
        id="usernameInput"
        label="Enter your username"
        value={username}
        onChange={handleUsernameChange}
        error={Boolean(!username)}
        helperText={Boolean(!username) ? "This field is required" : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      <RouterLink to="/login" style={{ textDecoration: "none" }}>
        <Typography variant="body2" mt={2}>
          Login Page
        </Typography>
      </RouterLink>
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
    </StyledContainer>
  );
};

export default ForgetPassword;
