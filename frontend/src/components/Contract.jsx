// src/components/Contract.js
import { useState } from "react";

const Contract = () => {
  const [accepted, setAccepted] = useState(false);

  const contractTerms = `
  Welcome to "El7a2ny" Online Clinic!

  Terms and Conditions of Employment:

  1. Position: You will be employed as an Online Doctor.
  2. Compensation: Your salary will be $60,000 per year.
  3. Working Hours: You are expected to work 40 hours per week.
  4. Benefits: You will be eligible for health insurance and paid time off.

  By accepting this contract, you agree to the terms and conditions outlined above.
`;

  const handleAcceptance = () => {
    setAccepted(true);
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

export default Contract;
