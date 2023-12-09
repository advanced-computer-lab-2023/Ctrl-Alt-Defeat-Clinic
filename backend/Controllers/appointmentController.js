const Appointment = require('../Models/Appointment');
const sendEmail = require('../Utils/email');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');

const addAppointment = async (req, res) => {
  const { patient, doctor, date } = req.query;

  if (!patient || !doctor || !date) return res.status(400).json('There are null values');

  try {
    let newAppointment;

    if (patient == 'Me') {
      newAppointment = await Appointment.create({ patient: req.user.username, doctor: doctor, date: date });

      const tempDoctor = await Doctor.findOneAndUpdate(
        { username: doctor },
        { $pull: { availableSlots: date }, $addToSet: { registeredPatients: req.user._id } },
        { new: true }
      ).exec();

      try {
        sendEmail({
          subject: 'appointment booked',
          email: req.user.email,
          message: `an appointment was booked successfully with Dr. ${tempDoctor.name} at ${date}.`,
        });

        sendEmail({
          subject: 'appointment booked',
          email: tempDoctor.email,
          message: `${req.user.name} booked an appointment with you at ${date}.`,
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      newAppointment = await Appointment.create({ patient: patient, doctor: doctor, date: date });

      const tempDoctor = await Doctor.findOneAndUpdate(
        { username: doctor },
        { $pull: { availableSlots: date } },
        { new: true }
      ).exec();

      const patientTarget = await Patient.findOne({ username: patient });

      try {
        sendEmail({
          subject: 'appointment booked',
          email: patientTarget.email,
          message: `an appointment was booked successfully with Dr. ${tempDoctor.name} at ${date}.`,
        });

        sendEmail({
          subject: 'appointment booked',
          email: tempDoctor.email,
          message: `${patientTarget.name} booked an appointment with you at ${date}.`,
        });
      } catch (err) {
        console.log(err.message);
      }
    }

    // console.log(newAppointment);
    res.status(200).json('Appointment created successfully!');
  } catch {
    res.status(500).json('Appointment not created successfully!');
  }
};

const filterAppointments = async (req, res, allAppointments) => {
  // filter appointments by date/status

  // Extract the targetDates from the request body
  const { startDate, endDate, status } = req.query;

  // Validate the targetDates and status
  if ((!startDate && endDate) || (startDate && !endDate)) return res.status(400).json('There are null values.');

  try {
    let foundAppointment;

    if (!startDate && !endDate && !status) {
      foundAppointment = allAppointments;
    } else if (!status) {
      // Filter appointments by date with the provided targetDates
      foundAppointment = allAppointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
      });

      //console.log("dates only");
    } else if (!startDate && !endDate) {
      // Filter appointments by status
      foundAppointment = allAppointments.filter(appointment => appointment.status === status);

      //console.log("status only");
    } else {
      // Filter appointments by both targetDates & status
      foundAppointment = allAppointments.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate >= new Date(startDate) &&
          appointmentDate <= new Date(endDate) &&
          appointment.status === status
        );
      });

      //console.log("both");
    }

    // Send the filtered appointments as a response
    res.status(200).json(foundAppointment);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).json('Internal server error');
  }
};

module.exports = { addAppointment, filterAppointments };
