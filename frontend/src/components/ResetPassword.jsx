import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    const res = await axios.post(
      `http://localhost:8000/api/v1/auth/resetPassword/${username}`,
      { password: newPassword },
      { withCredentials: true }
    );

    console.log(res.data);
    if (res.data.status === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <label htmlFor="passwordInput">Enter your new password:</label>
      <input
        type="password"
        id="passwordInput"
        value={newPassword}
        onChange={handlePasswordChange}
        placeholder="Enter your new password"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ResetPassword;
