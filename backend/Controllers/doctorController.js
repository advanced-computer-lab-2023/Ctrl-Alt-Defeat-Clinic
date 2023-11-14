const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Appointment = require('../Models/Appointment');
const Prescription = require('../Models/Prescriptions');
const { filterAppointments } = require('./appointmentController');

exports.viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerDoctor = async (req, res) => {
  const newDoctor = await Doctor.create(req.body);

  newDoctor.registrationStatus = undefined;
  res.status(201).json({
    message: 'pending approval of the new doctor',
    data: newDoctor,
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateDoctor = async (req, res) => {
  const { username, email, hourlyRate, affiliation } = req.body;
  try {
    const updatedDoctor = await Doctor.updateOne({ username }, { email, hourlyRate, affiliation });
    res.status(200).json({
      message: 'doctor info updated',
      data: updatedDoctor,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchPatientsByName = async (req, res) => {
  // const { name, doctorUsername } = req.query;
  const { name } = req.query;
  try {
    const doctor = await Doctor.findById(req.user._id).populate('registeredPatients');
    const patients = doctor.registeredPatients;
    const resultedPatients = patients.filter(patient => patient.name.toLowerCase().includes(name.toLowerCase()));
    res.status(200).send(resultedPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.selectPatient = async (req, res) => {
  const patientId = req.query.id;
  console.log(patientId);
  try {
    const resultedPatient = await Patient.findById(patientId);
    res.status(200).send(resultedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewAllPatients = async (req, res) => {
  const  doctorUsername  = req.user.username; //modifed to be used in scedule follow up
  try {
    const doctor = await Doctor.findOne({ username: doctorUsername }).populate('registeredPatients');
    res.status(200).send(doctor.registeredPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewPatientInfo = async (req, res) => {
  try {
    const { id } = req.query;
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(500).json({ message: 'Patient not found' });
    }

    console.log(patient.username);

    const appointments = await Appointment.find({ patient: patient.username });
    const prescriptions = await Prescription.find({ patient: id }).populate('doctor');

    const patientInfo = {
      patient,
      appointments,
      prescriptions,
    };
    res.status(200).send(patientInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.viewDoctorDetails = async (req, res) => {
  try {
    // Extract the doctor's username from the request body
    const username = req.params.username;
    // console.log(username);

    // Fetch the doctor's details from the database
    const selectedDoctor = await Doctor.findOne({ username });

    // If doctor not found, respond with a 404 error
    if (!selectedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    selectedDoctor.password = undefined;

    // Respond with the selected doctor's details, including specialty, affiliation, and educational background
    res.json({
      // username: selectedDoctor.username,
      // name: selectedDoctor.name,
      // specialty: selectedDoctor.specialty,
      // affiliation: selectedDoctor.affiliation,
      // educationalBackground: selectedDoctor.educationalBackground,
      data: selectedDoctor,
    });
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Filter doctors by availability at a specific date and time
exports.filterDoctors = async (req, res) => {
  try {
    const { name, speciality, registrationStatus, date } = req.query;

    const query = {};

    if (name) {
      query.name = name;
    }

    if (speciality) {
      query.speciality = speciality;
    }

    if (registrationStatus) {
      query.registrationStatus = registrationStatus;
    }

    // Find all doctors matching the specified criteria
    const matchingDoctors = await Doctor.find(query).exec();
    if (date) {
      // Find appointments for the specified date and time
      const matchingAppointments = await Appointment.find({ date: date }).exec();

      // Extract an array of unique doctor usernames from the matching appointments
      const doctorUsernames = [...new Set(matchingAppointments.map(appointment => appointment.doctor))];

      // Filter out doctors who have appointments at the specified date and time
      const availableDoctors = matchingDoctors.filter(doctor => !doctorUsernames.includes(doctor.username));
      res.status(200).json(availableDoctors);
      return;
    }
    res.status(200).json(matchingDoctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  //-------------- SPRINT 2 -------------------

  exports.addAvailableSlot = async (req, res) => {
    
    try {
  
      const {slotDate} = req.query;
  
      if(!slotDate) return res.status(400).json({ message: 'Enter the slot time and date.'});

      if(slotDate < new Date()) res.status(400).json({ message: 'Date and time has already passed.'});

      const doctor = await Doctor.findOneAndUpdate(
        { username: req.user.username },
        {$pull: { availableSlots: { $lt: new Date() } }},
        { new: true }
      );
  
      const updatedDoctor = await Doctor.updateOne({ username: req.user.username }, { $addToSet: { availableSlots: slotDate } });
  
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.viewDoctorAppointments = async (req,res) => {
  
    try{ 
      const appointments = await Appointment.find({doctor: req.user.username}).exec();
      filterAppointments(req, res, appointments);
  
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  };


exports.acceptContract = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the doctor by username
    const existingDoctor = await Doctor.findOne({ username });
    console.log(existingDoctor);
    // If doctor not found, respond with a 404 error
    if (!existingDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Update the doctor's registrationStatus to "accepted"
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { username },
      { registrationStatus: 'accepted' },
      { new: true }
    );

    // Respond with the updated doctor
    res.json(updatedDoctor);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error accepting contract:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addAvailableSlot = async (req, res) => {
    
  try {

    const {slotDate} = req.query;

    if(!slotDate) return res.status(400).json({ message: 'Enter the slot time and date.'});

    if(slotDate < new Date()) res.status(400).json({ message: 'Date and time has already passed.'});

    const doctor = await Doctor.findOneAndUpdate(
      { username: req.user.username },
      {$pull: { availableSlots: { $lt: new Date() } }},
      { new: true }
    );

    const updatedDoctor = await Doctor.updateOne({ username: req.user.username }, { $addToSet: { availableSlots: slotDate } });

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.scheduleFollowUp = async (req, res) => {
  try {

    const { patientId, dateTime } = req.body;

    const [date, time] = dateTime.split('T');

    const doctorId = req.user._id;

    // Use populate to get the registered patients' data
    
    const doctor = await Doctor.findById(doctorId);

    const registeredPatients = await doctor.populate('registeredPatients');

    // If doctor not found, respond with a 404 error
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }


    // Find the patient by id
    const patient = await Patient.findById(patientId);

    // If patient not found, respond with a 404 error
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check if patient is registered with the doctor
    const isPatientRegistered = doctor.registeredPatients.some(
      (registeredPatient) => registeredPatient.id === patientId
    );

    if (!isPatientRegistered) {
      return res.status(404).json({ error: 'Patient not registered with this doctor' });
    }

    // Create a new appointment
    const newAppointment = await Appointment.create({
      doctor: doctor.username,
      patient: patient.username,
      date: date,
      time: time,
      status: 'upcoming',

    });
    //remove the slot from available slots TODO
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { username: doctor.username },
      { $pull: { availableSlots: dateTime } },
      { new: true }
    );

    // Respond with the new appointment
    res.status(200).json(newAppointment);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error scheduling follow-up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.viewAvailableSlots = async (req, res) => {
  try {
    //const { date } = req.query;
    const doctor = await Doctor.findById(req.user._id);
    //const appointments = await Appointment.find({ doctor: doctor.username, date: date });
    const availableSlots = doctor.availableSlots;
    //const filteredSlots = availableSlots.filter(slot => !appointments.some(appointment => appointment.time === slot));
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
