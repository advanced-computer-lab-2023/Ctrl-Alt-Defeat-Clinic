const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Appointment = require('../Models/Appointment');
const Prescription = require('../Models/Prescriptions');

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
  const filteredObj = filterObj(req.body, 'email', 'hourlyRate', 'affiliation');

  const updatedDoctor = await Doctor.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
  });

  res.status(200).json({
    message: 'doctor info updated',
    data: updatedDoctor,
  });
};

exports.selectPatient = async (req, res) => {
  const patientId = req.query.id;
  try {
    const resultedPatient = await Patient.find({ _id: patientId });
    res.status(200).send(resultedPatient);
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

    const patientAppointments = await Appointment.find({ patient: id });
    const patientPrescriptions = await Prescription.find({ patient: id });

    const patientInfo = {
      ...patient,
      password: undefined,
      ...patientAppointments,
      ...patientPrescriptions,
    };
    res.status(200).send(patientInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.viewDoctorDetails = async (req, res) => {
  try {
    // Extract the doctor's username from the request body
    const { username } = req.body;

    // Fetch the doctor's details from the database
    const selectedDoctor = await Doctor.findOne({ username });

    // If doctor not found, respond with a 404 error
    if (!selectedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Respond with the selected doctor's details, including specialty, affiliation, and educational background
    res.json({
      username: selectedDoctor.username,
      name: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      affiliation: selectedDoctor.affiliation,
      educationalBackground: selectedDoctor.educationalBackground,
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

    // Find appointments for the specified date and time
    const matchingAppointments = await Appointment.find({ date: date }).exec();

    console.log(date);
    console.log(matchingAppointments);

    // Extract an array of unique doctor usernames from the matching appointments
    const doctorUsernames = [...new Set(matchingAppointments.map(appointment => appointment.doctor))];

    // Filter out doctors who have appointments at the specified date and time
    const availableDoctors = matchingDoctors.filter(doctor => !doctorUsernames.includes(doctor.username));

    res.status(200).json(availableDoctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
