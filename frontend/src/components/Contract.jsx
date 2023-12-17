import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Typography } from "@mui/material";

const Contract = ({ username, hourlyRate }) => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (accepted) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [accepted]);

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
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // borderRadius: "5px 5px 0 0",
        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <Typography variant="h4" style={{ margin: "20px" }}>
        Employment Contract
      </Typography>
      <form onSubmit={handleAcceptance}>
        <p>Here are the terms and conditions of your employment contract:</p>
        <pre>{contractTerms}</pre>
        {!accepted && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Typography variant="body1">
              Please read the contract terms carefully.
            </Typography>
            <Button type="submit" variant="contained">
              accept
            </Button>
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
