import React, { useState } from "react";

function DeletePackage() {
  const [packageName, setPackageName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the deletion logic here based on the provided package name.
    console.log(`Deleting package with name: ${packageName}`);
    // Clear the input field after submission if needed.
    setPackageName("");
  };

  return (
    <div>
      <h2>Delete Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Package Name to Delete:</label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Delete Package</button>
      </form>
    </div>
  );
}

export default DeletePackage;
