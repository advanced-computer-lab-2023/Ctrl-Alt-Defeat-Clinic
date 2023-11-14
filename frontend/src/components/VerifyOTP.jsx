import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    console.log(username);
    console.log(res.data);
    if (res.data.status === "success") {
      navigate(`/resetPassword/${username}`);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <label htmlFor="otpInput">Enter OTP:</label>
      <input
        type="text"
        id="otpInput"
        value={otp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default VerifyOTP;
