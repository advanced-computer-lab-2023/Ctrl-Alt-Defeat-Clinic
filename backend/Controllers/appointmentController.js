const Appointment = require('../Models/Appointment');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');

const addAppointment = async (req, res) => {
  const { familyMember, doctor, date} = req.query;

  if (!doctor || !date) return res.status(400).json('There are null values');

  try {

    let newAppointment;
    let price;
    let appDoctor = await Doctor.findOne({username: doctor}).exec();

    if (!appDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if( req.user.healthPackage == null){
      price = appDoctor.hourlyRate;
    }
    else{
      
      const appPatient = await Patient.findById(req.user._id).populate('healthPackage');
      price = (1 - (appPatient.healthPackage.discounts.doctorSessionDiscount)) * appDoctor.hourlyRate;
    }
    // has health package? yes => 'appointment' price=(hourly rate of doctor * (1-doctorSessionDiscount)), no => price=hourly rate of doctor;

    if(!familyMember){
      
      newAppointment = await Appointment.create({patient: req.user.username, doctor: doctor, date: date, price: price, });
      
      const tempDoctor = await Doctor.findOneAndUpdate(
        { username: doctor },
        {$pull: { availableSlots: {start:date} }, $addToSet: { registeredPatients: req.user._id }},
        { new: true }
      ).exec();
    }
    else{
      newAppointment = await Appointment.create({patient: req.user.username, doctor: doctor, date: date, familyMember: familyMember, price: price,});
      
      const tempDoctor = await Doctor.findOneAndUpdate(
        { username: doctor },
        {$pull: { availableSlots: {start:date} }, $addToSet: { registeredPatients: req.user._id }}, // add patient to registeredPatients when familyMember? TODO
        { new: true }
      ).exec();
    }

    

    // console.log(newAppointment);
    res.status(200).json('Appointment created successfully!');

  } catch (error){
    res.status(500).json({ message: 'Appointment not created successfully!', error: error.message });
  }
};

const rescheduleAppointment = async (req, res) => {
  try{

    const {appointmentId, rescheduleDate} = req.query;
    // rescheduleDate is in availableSlot list in for the doctor. "Select from availableSlot in frontend" MOHEMM
    // "Select appointment'Id' to reschedule from list of appointments in frontend" MOHEMMM

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if(appointment.status != "upcoming") return res.status(404).json({ message: 'Appointment cannot be rescheduled' });

    if(new Date(rescheduleDate) < new Date()) return res.status(400).json({ message: 'Date and time has already passed.'});
    if(new Date(rescheduleDate) <= new Date(appointment.date)) return res.status(400).json({ message: 'Date and time is the same.'});

    const rescheduledAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date: rescheduleDate, status: "rescheduled"},
      { new: true }
    );

    const tempDoctor = await Doctor.findOneAndUpdate(
      { username: appointment.doctor },
      { $pull: { availableSlots: {start: rescheduleDate}}},
      { new: true }
    ).exec();

    res.status(200).json({ message: 'Appointment rescheduled successfully', rescheduledAppointment });

  } catch (error){
    res.status(500).json({ message: 'Error rescheduling appointment', error: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try{

    const {appointmentId} = req.query;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if(appointment.status == "cancelled") return res.status(404).json({ message: 'Appointment already cancelled' });

    // Add logic for "Appointments cancelled less than 24 hours before the appointment do not receive a refund"
    // if this is (true) then {refund} else {no refund}
    const twentyFourHoursBefore = new Date((appointment.date).getTime() - 24 * 60 * 60 * 1000); // Subtract 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)

    const doctor = await Doctor.findById(req.user._id); // if currentUser = doctor, refund regardless? ASK ABT THIS

    if( (doctor) || !((twentyFourHoursBefore < (new Date())) && ((new Date()) < new Date(appointment.date))) ){
      const patient = await Patient.findOneAndUpdate(
        {username: appointment.patient}, 
        {$inc: { wallet: appointment.price } },
        { new: true }
      );
    }

    const cancelledAppointment = await Appointment.findByIdAndUpdate(
      appointmentId, 
      { status: "cancelled" },
      { new: true }
    );

    res.status(200).json({ message: 'Appointment cancelled successfully', cancelledAppointment });
  }
  catch(error){
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
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
    res.status(500).json('Internal server error');
  }
};

module.exports = { addAppointment, filterAppointments, rescheduleAppointment, cancelAppointment};