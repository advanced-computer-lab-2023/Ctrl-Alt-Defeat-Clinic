const { default: mongoose } = require('mongoose');
const Admin = require('../Models/Admin'); // Import your Admin model
const Patient = require('../Models/Patient'); // Import your Patient model
const Doctor = require('../Models/Doctor'); // Import your Doctor model

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body; // Assuming you're sending the data in the request body

    // Check if an admin with the same username already exists
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists with this username.' });
    }

    // Create a new admin instance
    const newAdmin = new Admin({ username, password });

    // Save the admin document to the database
    await newAdmin.save();

    res.status(201).json(newAdmin); // Respond with the created admin
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const username = req.params.username; // Assuming you're sending the username as a request body
    // Find the admin document by username and delete it
    const deletedAdmin = await Admin.findOneAndDelete({ username });

    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletePatient = async (req, res) => {
  try {
    const username = req.params.username; // Assuming you're sending the patient's username in the request body

    // Check if the username is provided in the request body
    if (!username) {
      return res.status(400).json({ error: 'Username is required in the request body' });
    }

    // Find the patient document by username and delete it
    const deletedPatient = await Patient.findOneAndDelete({ username });

    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const username = req.params.username; // Assuming you're sending the doctor's username in the request body

    // Check if the username is provided in the request body
    if (!username) {
      return res.status(400).json({ error: 'Username is required in the request body' });
    }

    // Find the doctor document by username and delete it
    const deletedDoctor = await Doctor.findOneAndDelete({ username });

    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPendingDoctors = async (req, res) => {
  try {
    // Assuming you have some form of authentication/authorization to ensure only admins can access this
    // Check if the user making the request is an admin (you need to implement this part)
    // if (!req.user || !req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Permission denied' });
    // }

    // Find all doctors with a registrationStatus of "pending"
    const pendingDoctors = await Doctor.find({ registrationStatus: 'pending' });

    // If no pending doctors are found, return an empty array
    if (!pendingDoctors || pendingDoctors.length === 0) {
      return res.status(404).json({ message: 'No pending doctors found' });
    }

    res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error('Error retrieving pending doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const allAdmins = async (req, res) => {
  try {
    // Fetch all admin documents from the database
    const admins = await Admin.find();

    // Respond with the list of admins
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const updateAdmin = async (req, res) => {
  try {
    // Extract admin username and updated password from the request body
    const { username, password } = req.body;

    // Find and update the admin by username, and return the updated admin
    const updatedAdmin = await Admin.findOneAndUpdate({ username }, { password }, { new: true });

    // If admin not found, respond with a 404 error
    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Respond with the updated admin
    res.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const approveDoctor = async (req, res) => {
  try {
    // Extract doctor username from the request body
    const { username } = req.body;

    // Find the doctor by username
    const existingDoctor = await Doctor.findOne({ username });

    // If doctor not found, respond with a 404 error
    if (!existingDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if the doctor is already accepted
    if (existingDoctor.registrationStatus === 'accepted') {
      // If the doctor is already approved, respond with a 400 Bad Request
      return res.status(400).json({ error: 'Doctor is already approved' });
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
    console.error('Error approving doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addAdmin,
  allAdmins,
  approveDoctor,
  deleteDoctor,
  deleteAdmin,
  deletePatient,
  getPendingDoctors,
  updateAdmin,
};
