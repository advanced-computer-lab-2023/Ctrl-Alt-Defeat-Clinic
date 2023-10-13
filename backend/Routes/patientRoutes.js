const express = require('express');
const patientController = require('../Controllers/patientController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/searchPatientsByName').get(patientController.searchPatientsByName);
router.route('/register').post(patientController.registerPatient);
router.route('/addMember/:id').post(patientController.addFamilyMember);
router.route('/viewFamilyMembers').get(patientController.viewFamilyMembers);
router.route('/viewPatients').get(patientController.viewAllPatients);
router.route('/getAllPrescriptionsForPatient').get(patientController.getAllPrescriptionsForPatient);
router.route('/getPrescriptionById').get(patientController.getPrescriptionById);
router.route('/filterPrescriptions').get(patientController.filterPrescriptions);
router.route('/viewDoctors/:username').get(patientController.viewAllDoctors);
router.route('/searchForDoctors').get(patientController.searchForDoctors);

module.exports = router;
