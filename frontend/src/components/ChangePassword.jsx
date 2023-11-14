import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changed, setChanged] = useState(false);
  //   const navigate = useNavigate();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/changePassword",
      { currentPassword, newPassword },
      { withCredentials: true }
    );

    console.log(res.data);
    if (res.data.status === "success") {
      setChanged(true);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <label htmlFor="currentPasswordInput">Enter your current password:</label>
      <input
        type="password"
        id="currentPasswordInput"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
        placeholder="Enter your current password"
      />

      <label htmlFor="newPasswordInput">Enter your new password:</label>
      <input
        type="password"
        id="newPasswordInput"
        value={newPassword}
        onChange={handleNewPasswordChange}
        placeholder="Enter your new password"
      />

      <button onClick={handleSave}>Save</button>
      {changed && <div>password changed successfully</div>}
    </div>
  );
};

export default ChangePassword;
