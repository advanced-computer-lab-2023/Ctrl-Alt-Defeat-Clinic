const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const { generateToken } = require('./authController');
const Package = require('../Models/Package');
const FamilyMember = require('../Models/FamilyMember');
const Prescription = require('../Models/Prescriptions');
const Appointment = require('../Models/Appointment');
const { filterAppointments } = require('./appointmentController');

exports.registerPatient = async (req, res) => {
  const newPatient = await Patient.create(req.body);
  const token = generateToken(newPatient._id, 'patient');

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({
    message: 'patient created successfully',
    token,
    data: newPatient,
  });
};

exports.addFamilyMember = async (req, res) => {
  try {
    const username = req.query.username;
    const patient = await Patient.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const memberData = req.body;

    // Save the new family member to the database
    const newMember = await FamilyMember.create(memberData);

    // Add the new family member's ObjectId to the patient's familyMembers array
    // Save the updated patient document
    const updatedPatient = await Patient.updateOne({ username: username }, { $push: { familyMembers: newMember._id } });

    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Cannot add the family member' });
  }
};

exports.viewAllDoctors = async (req, res) => {
  const { username } = req.params;
  try {
    //Getting the current patient view the list of doctor
    const currentPatient = await Patient.findOne({ username });

    if (!currentPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const doctors = await Doctor.find({}, 'name speciality hourlyRate');

    const doctorsWithSessionPrices = await Promise.all(
      doctors.map(async currentDoctor => {
        const sessionPrice = await calculateSessionPrice(currentDoctor.hourlyRate, currentPatient.healthPackage);
        return {
          name: currentDoctor.name,
          speciality: currentDoctor.speciality,
          sessionPrice,
        };
      })
    );

    res.status(200).send(doctorsWithSessionPrices);
  } catch (error) {
    res.status(500).json({ err: 'Could not view doctors' });
  }
};

async function calculateSessionPrice(doctorRate, healthPackage) {
  //Calculating the sessionPrice of doctor

  const patientPackage = await Package.findById(healthPackage);
  return (
    doctorRate +
    (doctorRate * 10) / 100 -
    (patientPackage ? (doctorRate + (doctorRate * 10) / 100) * patientPackage.discounts.doctorSessionDiscount : 0)
  );
}

exports.viewFamilyMembers = async (req, res) => {
  try {
    const username = req.query.username;
    const patient = await Patient.findOne({ username: username }).populate('familyMembers');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const familyMembers = patient.familyMembers;

    if (!familyMembers || familyMembers.length === 0) {
      return res.status(200).json({ message: 'No family members found for the patient' });
    }

    res.status(200).json(familyMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewAllPatients = async (req, res) => {
  try {
    const allPatients = await Patient.find();
    console.log(allPatients);
    res.status(200).send(allPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPrescriptionsForPatient = async (req, res) => {
  try {
    const username = req.query.username;
    const patient = await Patient.findOne({ username: username });
    const patientId = patient.id;

    const prescriptions = await Prescription.find({ patient: patientId }).populate('doctor');

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPrescriptionById = async (req, res) => {
  try {
    const prescriptionId = req.query.prescriptionId;

    const prescription = await Prescription.findById(prescriptionId).populate('doctor');

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.filterPrescriptions = async (req, res) => {
  const { date, doctorUsername, filled, patientUsername } = req.query;

  try {
    let query = {};

    if (date) {
      // Convert the filter date to a JavaScript Date object
      const filterDate = new Date(date);

      // Set the filter to match any prescription created on the same date
      // by checking if it falls within the range from start to end of the day
      filterDate.setHours(0, 0, 0, 0); // Set to the start of the day
      const endOfDay = new Date(filterDate);
      endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

      query.createdAt = {
        $gte: filterDate,
        $lte: endOfDay,
      };
    }

    if (doctorUsername) {
      const doctor = await Doctor.findOne({ username: doctorUsername });
      const doctorId = doctor.id;
      query.doctor = doctorId;
    }

    if (patientUsername) {
      const patient = await Patient.findOne({ username: patientUsername });
      const patientId = patient.id;
      query.patient = patientId;
    }

    if (filled === 'true') {
      query.filled = true;
    } else if (filled === 'false') {
      query.filled = false;
    }

    const prescriptionsWithDoctor = await Prescription.find(query).populate('doctor');

    res.status(200).json(prescriptionsWithDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchForDoctors = async (req, res) => {
  const { name, speciality } = req.query;

  try {
    let query = {};
    if (name) {
      query.name = name;
    }
    if (speciality) {
      query.speciality = speciality;
    }
    const resultedDoctors = await Doctor.find(query);
    res.status(200).json(resultedDoctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.subscribeToHealthPackage = async (req, res) => {
  
  try {
    const { patientId, healthPackageId } = req.body;
    
    const familyMembers = await Patient.findById(patientId).populate('familyMembers');
    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Find the health package by ID
    const healthPackage = await Package.findById(healthPackageId);

    if (!healthPackage) {
      return res.status(404).json({ error: 'Health package not found' });
    }

    // Subscribe the patient to the health package
    patient.healthPackage = healthPackageId;
    await patient.save();

    for(let i = 0; i < familyMembers.familyMembers.length; i++){
      familyMembers.familyMembers[i].healthPackage = healthPackageId;
      await familyMembers.familyMembers[i].save();
    }

    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subscription' });
  }
};

  //-------------- SPRINT 2 -------------------

  exports.viewDoctorSlots = async (req, res) => {

    try{
  
      const {doctorUsername} = req.query;
  
      if(!doctorUsername) return res.status(400).json('There are null values.');
  
      const doctor = await Doctor.findOne({ username: doctorUsername }).exec();
  
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  
      res.status(200).json(doctor.availableSlots);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  
  };
  
  exports.viewPatientAppointments = async (req,res) => {
  
    try{
  
      const appointments = await Appointment.find({patient: req.user.username}).exec();
  
      //res.status(200).json(appointments);
  
      filterAppointments(req, res, appointments);
  
    } catch(err){
      res.status(500).json({ message: err.message });
    }
  };