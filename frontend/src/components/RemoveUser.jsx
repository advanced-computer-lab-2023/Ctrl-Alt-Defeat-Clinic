import React, { useState } from "react";

function RemoveUser() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the removal logic here based on the provided username.
    console.log(`Removing user with username: ${username}`);
    // Reset the input field after submission if needed.
    setUsername("");
  };

  return (
    <div>
      <h2>Remove User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit">Remove User</button>
      </form>
    </div>
  );
}

export default RemoveUser;
