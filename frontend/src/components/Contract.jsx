import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Contract = ({ username, hourlyRate }) => {
  const [accepted, setAccepted] = useState(false);

  const contractTerms = `
  Welcome to "El7a2ny" Online Clinic!

  Terms and Conditions of Employment:

  1. Position: You will be employed as an Online Doctor.
  2. Compensation: Your salary will be ${
    hourlyRate * 0.9
  } per hour. (Please note that 10% have been deducted for clinic markup.)
  3. Working Hours: You are expected to work 40 hours per week.
  4. Benefits: You will be eligible for health insurance and paid time off.

  By accepting this contract, you agree to the terms and conditions outlined above.
`;

  const handleAcceptance = async (e) => {
    e.preventDefault();
    console.log(username);

    try {
      // Call the acceptContract API with the username
      await axios.put("http://localhost:8000/api/v1/doctors/acceptContract", {
        username,
      }); // Update the URL accordingly

      setAccepted(true);
    } catch (error) {
      console.error("Error accepting contract:", error);
    }
  };

  return (
    <div>
      <h2>Employment Contract</h2>
      <form onSubmit={handleAcceptance}>
        <p>Here are the terms and conditions of your employment contract:</p>
        <pre>{contractTerms}</pre>
        {!accepted && (
          <div>
            <p>Please read the contract terms carefully.</p>
            <button type="submit">Accept</button>
          </div>
        )}
      </form>
      {accepted && <p>You have accepted the contract. Welcome aboard!</p>}
    </div>
  );
};

Contract.propTypes = {
  username: PropTypes.string.isRequired,
  hourlyRate: PropTypes.number.isRequired,
};

export default Contract;
