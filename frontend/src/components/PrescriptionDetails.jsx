import React from "react";
import PropTypes from "prop-types";

class PrescriptionDetails extends React.Component {
  render() {
    return (
      <div>
        <h2>Prescription Details</h2>
        {this.props.selectedPrescription ? (
          <div>
            <p>Medicines:</p>
            <ul>
              {this.props.selectedPrescription.medicines.map(
                (medicine, index) => (
                  <li key={index}>
                    <p>Name: {medicine.name}</p>
                    <p>Dosage: {medicine.dosage}</p>
                    <p>Duration: {medicine.duration}</p>
                  </li>
                )
              )}
            </ul>
            <p>
              Status:{" "}
              {this.props.selectedPrescription.filled ? "Filled" : "Not Filled"}
            </p>
            <p>Doctor: {this.props.selectedPrescription.doctor.name}</p>
          </div>
        ) : (
          <p>Select a prescription to view details.</p>
        )}
      </div>
    );
  }
}

PrescriptionDetails.propTypes = {
  selectedPrescription: PropTypes.shape({
    medicines: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        dosage: PropTypes.string,
        duration: PropTypes.string,
      })
    ),
    filled: PropTypes.bool,
    doctor: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default PrescriptionDetails;
