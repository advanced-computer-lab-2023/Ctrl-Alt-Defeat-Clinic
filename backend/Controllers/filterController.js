const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const Appointment = require('../Models/Appointment');

const filterAppointments = async (req, res) => {
  // filter appointments by date/status

  // Extract the targetDates from the request body
  const { startDate, endDate, targetStatus } = req.body;

  // Validate the targetDates and targetStatus
  if ((!startDate && endDate) || (startDate && !endDate) || (!startDate && !endDate && !targetStatus))
    return res.status(400).json('There are null values.');

  try {
    let foundAppointment;

    if (!targetStatus) {
      // Fetch appointments with taregtDates
      foundAppointment = await Appointment.find({ date: { $gte: startDate, $lte: endDate } }).exec();

      //console.log("dates only");
    } else if (!startDate && !endDate) {
      // Fetch appointments with a targetStatus
      foundAppointment = await Appointment.find({ status: targetStatus }).exec();

      //console.log("status only");
    } else {
      // Fetch appointments with both targetDates & targetStatus
      foundAppointment = await Appointment.find({
        date: { $gte: startDate, $lte: endDate },
        status: targetStatus,
      }).exec();

      //console.log("both");
    }

    // Send the appointments as a response
    res.send(foundAppointment);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
};

const filterPatients = async (req, res) => {
  // filter patients based on upcoming appointments

  const { doctorUsername } = req.query;

  try {
    // Fetch appointments with a date in the future
    const appointments = await Appointment.find({ date: { $gte: new Date() } }).exec();

    // Extract the 'patient' values from appointments and create an array
    const patientIds = appointments.map(appointment => appointment.patient);

    const doctor = await Doctor.findOne({ username: doctorUsername }).populate('registeredPatients');

    const patients = doctor.registeredPatients.filter(patient => patientIds.includes(patient.username));

    // Send the patients as a response
    res.send(patients);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
};

const filterDoctors = async (req, res) => {
  // filter a doctor by speciality and/or availability on a certain date and at a specific time

  // Extract the targetDate from the request body
  const { startDate, endDate, speciality } = req.body;

  // Validate the targetDate
  if ((!startDate && endDate) || (startDate && !endDate) || (!startDate && !endDate && !speciality))
    return res.status(400).json('There are null values.');

  try {
    let doctors;

    if (startDate && endDate) {
      // Fetch appointments with the targetDate
      const appointments = await Appointment.find({ date: { $gte: startDate, $lte: endDate } }).exec();

      // Extract the 'doctor' values from appointments and create an array
      const doctorIds = appointments.map(appointment => appointment.doctor);

      if (!speciality) {
        // Fetch doctors whose 'username' is in the 'doctorIds' array
        doctors = await Doctor.find({ username: { $in: doctorIds } }).exec();
      } else {
        // Fetch doctors whose 'username' is in the 'doctorIds' array + with target 'speciality'
        doctors = await Doctor.find({ username: { $in: doctorIds }, speciality: speciality }).exec();
      }
    } else {
      // Fetch doctors with target 'speciality'
      doctors = await Doctor.find({ speciality: speciality }).exec();
    }
    // Send the doctors as a response
    res.send(doctors);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
  try {
    // Send the doctors as a response
    res.send(doctors);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
};

module.exports = { filterAppointments, filterPatients, filterDoctors };
