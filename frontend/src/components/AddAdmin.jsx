import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function AddAdmin() {
  const [res, setRes] = useState(null);
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
    const response = await Axios.post(
      "http://localhost:8000/api/v1/admins/add",
      formData
    );
    console.log(response);
    setRes(response);
  };

  return (
    <div>
      <h2>Add Admin</h2>
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
        <button type="submit">Add Admin</button>
      </form>
      {res && <div>new admin added</div>}
      <Link to="/admins/home">Home</Link>
    </div>
  );
}

export default AddAdmin;
