const Appointment = require('../Models/Appointment');

const addAppointment = async (req, res) => {
  const { patient, doctor, date, status } = req.body;

  if (!patient || !doctor || !date || !status) return res.status(400).json('There are null values');

  try {
    const newAppointment = await Appointment.create(req.body);
    // console.log(newAppointment);
    res.send('Appointment created successfully!');
  } catch {
    res.send('Appointment not created successfully!');
  }
};

module.exports = { addAppointment };
