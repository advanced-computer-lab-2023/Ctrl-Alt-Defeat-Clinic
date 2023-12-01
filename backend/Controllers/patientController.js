const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const { generateToken } = require('./authController');
const Package = require('../Models/Package');
const FamilyMember = require('../Models/FamilyMember');
const Prescription = require('../Models/Prescriptions');
const path = require('path');
const fs = require('fs');
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
    const patient = await Patient.findOne({ username: req.user.username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const memberData = req.body;

    // Save the new family member to the database
    const newMember = await FamilyMember.create(memberData);

    // Add the new family member's ObjectId to the patient's familyMembers array
    // Save the updated patient document
    const updatedPatient = await Patient.updateOne(
      { username: req.user.username },
      { $push: { familyMembers: newMember._id } }
    );

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
    const patient = await Patient.findOne({ username: req.user.username }).populate('familyMembers');

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
    const patientId = req.user._id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

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

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

exports.createCheckoutSessionForHp = async (req, res) => {
  const { healthPackageId } = req.body;
  try {
    const healthPackage = await Package.findById(healthPackageId);
    // Create a Stripe price object
    const price = await stripe.prices.create({
      unit_amount: healthPackage.price * 100,
      currency: 'egp',
      recurring: {
        interval: 'month',
      },
      product_data: {
        name: healthPackage.name + ' Health Package',
      },
    });

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      customer_email: req.user.email,
      client_reference_id: req.user._id,
      success_url: `http://localhost:5173/patients/healthPackages?healthPackageId=${healthPackageId}&success=true`,
      cancel_url: `http://localhost:5173/patients/healthPackages`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subscription' });
  }
};

exports.subscribeToHealthPackage = async (req, res) => {
  try {
    const { healthPackageId } = req.body;
    const patientId = req.user._id;

    const patient = await Patient.findById(patientId).populate('familyMembers');
    const familyMembers = patient.familyMembers;
    const healthPackage = await Package.findById(healthPackageId);

    // Subscribe the patient to the health package
    patient.healthPackage = healthPackageId;
    patient.healthPackageStatus = 'subscribed';
    patient.healthPackageRenewalDate = new Date();
    await patient.save();

    for (let i = 0; i < familyMembers.length; i++) {
      familyMembers[i].healthPackage = healthPackageId;
      familyMembers[i].healthPackageStatus = 'subscribed';
      familyMembers[i].healthPackageRenewalDate = new Date();
      await familyMembers[i].save();
    }

    res.status(200).json({
      name: healthPackage.name,
      id: healthPackage._id,
      status: patient.healthPackageStatus,
      renewalDate: patient.healthPackageRenewalDate,
      endDate: patient.healthPackageEndDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subscription' });
  }
};

exports.subscribeToHealthPackageByWallet = async (req, res) => {
  try {
    const { healthPackageId } = req.body;
    const patientId = req.user._id;

    const patient = await Patient.findById(patientId).populate('familyMembers');
    const familyMembers = patient.familyMembers;
    const healthPackage = await Package.findById(healthPackageId);

    if (patient.wallet < healthPackage.price) {
      return res.status(200).json({ error: 'Not enough money in wallet' });
    }

    // Subscribe the patient to the health package
    patient.healthPackage = healthPackageId;
    patient.healthPackageStatus = 'subscribed';
    patient.healthPackageRenewalDate = new Date();
    patient.wallet -= healthPackage.price;
    await patient.save();

    for (let i = 0; i < familyMembers.length; i++) {
      familyMembers[i].healthPackage = healthPackageId;
      familyMembers[i].healthPackageStatus = 'subscribed';
      familyMembers[i].healthPackageRenewalDate = new Date();
      await familyMembers[i].save();
    }

    res.status(200).json({
      name: healthPackage.name,
      id: healthPackage._id,
      status: patient.healthPackageStatus,
      renewalDate: patient.healthPackageRenewalDate,
      endDate: patient.healthPackageEndDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during subscription' });
  }
};

exports.linkFamilyMember = async (req, res) => {
  try {
    const { phoneNumber, email, relationship } = req.body;

    // Find the patient with the given username
    const patient = await Patient.findOne({ username: req.user.username });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find the patient with the given phone number or email
    const familyMember = await Patient.findOne({
      $or: [{ mobileNumber: phoneNumber.toString() }, { email }],
    });

    if (!familyMember) {
      return res.status(404).json({ message: 'Family member not found' });
    }

    // Check if the family member is already related to the patient
    if (patient.familyMembers.includes(familyMember._id)) {
      return res.status(400).json({ message: 'Family member is already related to the patient' });
    }

    // Explicitly fetch the required fields from the familyMember
    const { name, gender, nationalId } = familyMember;
    // Assuming familyMember.dateOfBirth is a valid Date object
    const birthDate = new Date(familyMember.dateOfBirth);
    const currentDate = new Date();

    // Calculate the age
    const ageInMillis = currentDate - birthDate;
    const age = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));

    // Create a new FamilyMember document with provided fields
    const newFamilyMember = new FamilyMember({
      name,
      nationalId,
      age,
      gender,
      relationToPatient: relationship,
    });

    // Save the new family member to the database
    await newFamilyMember.save();

    // Add the new family member's ObjectId to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember._id);
    await patient.save();

    res.status(201).json({ message: 'Family member linked successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nationalId) {
      // Handle the duplicate key error for nationalId
      return res.status(400).json({ error: 'Duplicate nationalId. Please use a different nationalId.' });
    }

    console.error('Error linking family member:', error);
    res.status(500).json({ error: 'Cannot link the family member' });
  }
};

//-------------- SPRINT 2 -------------------

exports.viewDoctorSlots = async (req, res) => {
  try {
    const { doctorUsername } = req.query;

    if (!doctorUsername) return res.status(400).json('There are null values.');

    const doctor = await Doctor.findOne({ username: doctorUsername }).exec();

    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const updateDoctor = await Doctor.findOneAndUpdate(
      { username: doctorUsername },
      { $pull: { availableSlots: { $lt: new Date() } } },
      { new: true }
    );

    res.status(200).json(updateDoctor.availableSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.username }).exec();
    filterAppointments(req, res, appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelHealthPackage = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user._id).populate('familyMembers');
    const familyMembers = patient.familyMembers;

    patient.healthPackageStatus = 'cancelled';
    patient.healthPackageEndDate = new Date();
    await patient.save();

    for (let i = 0; i < familyMembers.length; i++) {
      familyMembers[i].healthPackageStatus = 'cancelled';
      familyMembers[i].healthPackageEndDate = new Date();
      await familyMembers[i].save();
    }

    res.status(200).json({
      name: patient.healthPackage.name,
      id: patient.healthPackage._id,
      status: patient.healthPackageStatus,
      renewalDate: patient.healthPackageRenewalDate,
      endDate: patient.healthPackageEndDate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during cancellation' });
  }
};

exports.getHealthPackageStatus = async (req, res) => {
  try {
    const user = req.user;
    const healthPackage = user.healthPackage;
    if (!healthPackage) {
      return res.status(200).json({});
    }
    await user.populate('healthPackage');
    const healthPackageStatus = {
      name: healthPackage.name,
      id: healthPackage._id,
      status: user.healthPackageStatus,
      renewalDate: user.healthPackageRenewalDate,
      endDate: user.healthPackageEndDate,
    };
    res.status(200).json(healthPackageStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during cancellation' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const patientId = req.user._id;
    const filePath = req.file.path;

    // Update the patient's medicalHistory field by adding to the array
    await Patient.findByIdAndUpdate(patientId, { $push: { medicalHistory: filePath } });

    res.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

exports.deleteMedicalHistory = async (req, res) => {
  try {
    const patientId = req.user._id;
    const filePath = req.body.filePath;

    // Update the patient's medicalHistory field by removing the file path from the array
    await Patient.findByIdAndUpdate(patientId, { $pull: { medicalHistory: filePath } });
    res.json({ message: 'File deleted successfully' });
    // Delete the file from the uploads folder
    const fullPath = path.join(__dirname, '..', '..', filePath);

    console.log('Attempting to delete file at path:', fullPath);

    // if (fs.existsSync(fullPath)) {
    //   fs.unlinkSync(fullPath);
    //   res.json({ message: 'File deleted successfully' });
    // } else {
    //   res.status(404).json({ message: 'File not found' });
    // }
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'Error deleting file' });
  }
};

exports.getAllMedicalHistory = async (req, res) => {
  try {
    const patientId = req.user._id; // Assuming you have the user ID in the request

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const medicalHistory = patient.medicalHistory || [];

    res.status(200).json({ medicalHistory });
  } catch (error) {
    console.error('Error fetching medical history:', error);
    res.status(500).json({ message: 'Error fetching medical history' });
  }
};
