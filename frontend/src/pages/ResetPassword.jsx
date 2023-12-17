import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[4],
}));

const ResetPassword = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState(null);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/resetPassword/${username}`,
        { password: newPassword },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        setAlertMsg({
          type: "success",
          text: "Password reset successful! Redirecting you to login...",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setAlertMsg({
        type: "error",
        text: "An error occurred while resetting the password.",
      });
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Typography variant="h5">Reset Password</Typography>
      <TextField
        margin="normal"
        fullWidth
        id="passwordInput"
        label="Enter your new password"
        type="password"
        value={newPassword}
        onChange={handlePasswordChange}
      />
      <Button fullWidth variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
        Save
      </Button>
      <Snackbar
        open={Boolean(alertMsg)}
        autoHideDuration={3000}
        onClose={() => setAlertMsg(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlertMsg(null)}
          severity={alertMsg?.type || "info"}
          sx={{ width: "100%" }}
        >
          {alertMsg?.text || ""}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ResetPassword;
