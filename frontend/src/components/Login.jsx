import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { username: formData.username, password: formData.password },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.role === "admin") {
        navigate("/admins/home");
      } else if (response.data.role === "doctor") {
        navigate("/doctors/home");
      } else {
        navigate("/patients/home");
      }
    } catch (err) {
      console.log(err);
      if (err.response) setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/forgetPassword">forgot password</Link>
      {message && <div>{message}</div>}
    </div>
  );
}

export default Login;
