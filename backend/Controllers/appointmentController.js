const Appointment = require('../Models/Appointment');

const addAppointment = async (req, res) => {
  const { patient, doctor, date, status } = req.query;

  if (!patient || !doctor || !date || !status) return res.status(400).json('There are null values');

  try {
    const newAppointment = await Appointment.create(req.query);

    const doctor = await Doctor.findOneAndUpdate(
      { username: doctor },
      {$pull: { availableSlots: date }},
      { new: true }
    );

    // console.log(newAppointment);
    res.send('Appointment created successfully!');
  } catch {
    res.send('Appointment not created successfully!');
  }
};

const filterAppointments = async (req, res, allAppointments) => {
  // filter appointments by date/status

  // Extract the targetDates from the request body
  const { startDate, endDate, status } = req.query;

  // Validate the targetDates and status
  if ((!startDate && endDate) || (startDate && !endDate) )
    return res.status(400).json('There are null values.');

  try {
    let foundAppointment;

    if(!startDate && !endDate && !status){

      foundAppointment = allAppointments;

    } else if (!status) {
      // Filter appointments by date with the provided targetDates
      foundAppointment = allAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
      });

      //console.log("dates only");
    } else if (!startDate && !endDate) {
      // Filter appointments by status
      foundAppointment = allAppointments.filter((appointment) => appointment.status === status);

      //console.log("status only");
    } else {
      // Filter appointments by both targetDates & status
      foundAppointment = allAppointments.filter((appointment) => {
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
    res.status(500).send('Internal server error');
  }
};

module.exports = { addAppointment, filterAppointments };