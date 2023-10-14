// Import necessary modules
const express = require('express');
const router = express.Router();
const Admin = require('../Models/Admin'); // Import your Admin model
const {
  addAdmin,
  allAdmins,
  getPendingDoctors,
  deleteAdmin,
  deleteDoctor,
  deletePatient,
  updateAdmin,
  approveDoctor,
} = require('../Controllers/adminController');

//Get requests

// Route handler for getting a list of all admins
router.get('/', allAdmins);
// Route handler for getting pending doctor information
router.get('/pendingdoctors', getPendingDoctors);

//Post Requests

// Route handler for creating a new admin
router.post('/add', addAdmin);

//Deleting Entities

// Route handler for deleting an admin by username
router.delete('/deleteAdmin/:username', deleteAdmin);
// Route handler for deleting an doctor by username
router.delete('/deleteDoctor/:username', deleteDoctor);
// Route handler for deleting an Patient by username
router.delete('/deletePatient/:username', deletePatient);

//Put Requests

// Route handler for updating admin information (e.g., password)
router.put('/updateadmin', updateAdmin);
// Route handler for approving a doctor
router.put('/approve', approveDoctor);

// Export the router for use in the main application file
module.exports = router;
