import React from "react";
import PropTypes from "prop-types";

class DoctorDetails extends React.Component {
  render() {
    return (
      <div>
        <h2>Doctor Details</h2>
        {this.props.selectedDoctor ? (
          <div>
            <p>Name: {this.props.selectedDoctor.name}</p>
            <p>Username: {this.props.selectedDoctor.username}</p>
            <p>Speciality: {this.props.selectedDoctor.speciality}</p>
            <p>
              Registration Status:{" "}
              {this.props.selectedDoctor.registrationStatus}
            </p>
            <p>Hourly Rate: {this.props.selectedDoctor.hourlyRate}</p>
            <p>Affiliation: {this.props.selectedDoctor.affiliation}</p>
            <p>
              Educational Background:{" "}
              {this.props.selectedDoctor.educationalBackground}
            </p>
          </div>
        ) : (
          <p>Select a doctor to view details.</p>
        )}
      </div>
    );
  }
}

DoctorDetails.propTypes = {
  selectedDoctor: PropTypes.shape({
    name: PropTypes.string,
    speciality: PropTypes.string,
    registrationStatus: PropTypes.string,
    hourlyRate: PropTypes.number,
    affiliation: PropTypes.string,
    educationalBackground: PropTypes.string,
    username: PropTypes.string,
  }),
};

export default DoctorDetails;
