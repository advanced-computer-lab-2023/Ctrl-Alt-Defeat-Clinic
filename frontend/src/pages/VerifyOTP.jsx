import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.common.white,
  boxShadow: theme.shadows[4],
}));

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const { username } = useParams();
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `http://localhost:8000/api/v1/auth/verifyOTP/${username}`,
      { otp },
      { withCredentials: true }
    );

    if (res.data.status === "success") {
      navigate(`/resetPassword/${username}`);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <Typography variant="h5">Verify OTP</Typography>
      <TextField
        margin="normal"
        fullWidth
        id="otpInput"
        label="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </StyledContainer>
  );
};

export default VerifyOTP;
