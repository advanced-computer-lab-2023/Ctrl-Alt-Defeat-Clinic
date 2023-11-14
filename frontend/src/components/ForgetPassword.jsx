import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/forgetPassword",
      { username },
      { withCredentials: true }
    );
    console.log(res.data.status);
    if (res.data.status === "success") {
      //   console.log("hello");
      navigate(`/verifyOTP/${username}`);
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <label htmlFor="usernameInput">Enter your username:</label>
      <input
        type="text"
        id="usernameInput"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter your username"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ForgetPassword;
