const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const { generateToken } = require('./AuthController');
const Package = require('../Models/Package');
const FamilyMember = require('../Models/FamilyMember');
const Prescription = require('../Models/Prescriptions');

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
    const patientId = req.params.id;
    const memberData = req.body;
    const newMember = new FamilyMember(memberData);
    await newMember.save();
    User.findByIdAndUpdate(
      patientId,
      { $push: { familyMembers: newMember._id } },
      { new: true },
      (err, updatedPatient) => {
        if (err) {
          console.error(err);
        } else {
          console.log(updatedPatient);
        }
      }
    );
    res.status(201).json(savedMember);
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
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(500).send('Patient not found');
    }
    const familyMembrers = patient.FamilyMember;
    res.status(201).send(familyMembrers);
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
    const patientId = req.query.patientId;
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
  const { date, doctorId, filled } = req.query;

  try {
    let query = {};

    if (date) {
      query.createdAt = { $gte: new Date(date) };
    }

    if (doctorId) {
      query.doctor = doctorId;
    }

    if (filled === 'true') {
      query.filled = true;
    } else if (filled === 'false') {
      query.filled = false;
    }

    const prescriptions = await Prescription.find(query);
    res.status(200).json(prescriptions);
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
