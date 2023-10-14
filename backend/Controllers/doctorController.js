const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Appointment = require('../Models/Appointment');
const Prescription = require('../Models/Prescriptions');

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
  const { name, doctorUsername } = req.query;
  try {
    const doctor = await Doctor.findOne({ username: doctorUsername }).populate('registeredPatients');
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
  const { doctorUsername } = req.query;
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
