import React from "react";
import PropTypes from "prop-types";

class PrescriptionListChild extends React.Component {
  render() {
    return (
      <div>
        <h2>Your Prescriptions</h2>
        <div>
          <label>Enter Username:</label>
          <input
            type="text"
            value={this.props.username}
            onChange={(e) => this.props.onUsernameChange(e.target.value)}
          />
          <button onClick={this.props.onFetchPrescriptions}>
            Fetch Prescriptions
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>
                  <button
                    onClick={() =>
                      this.props.onPrescriptionSelect(prescription)
                    }
                  >
                    {prescription.medication}
                  </button>
                </td>
                <td>{prescription.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

PrescriptionListChild.propTypes = {
  username: PropTypes.string,
  onUsernameChange: PropTypes.func,
  onFetchPrescriptions: PropTypes.func,
  prescriptions: PropTypes.array,
  onPrescriptionSelect: PropTypes.func,
};

export default PrescriptionListChild;
