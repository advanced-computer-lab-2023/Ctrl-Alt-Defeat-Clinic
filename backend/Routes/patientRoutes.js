const express = require('express');
const patientController = require('../Controllers/patientController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();


router.route('/register').post(patientController.registerPatient);
router.route('/addMember').post(patientController.addFamilyMember);
router.route('/viewFamilyMembers').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.viewFamilyMembers);
router.route('/getAllPrescriptionsForPatient').get(patientController.getAllPrescriptionsForPatient);
router.route('/getPrescriptionById').get(patientController.getPrescriptionById);
router.route('/filterPrescriptions').get(patientController.filterPrescriptions);
router.route('/viewDoctors/:username').get(patientController.viewAllDoctors);
router.route('/searchForDoctors').get(patientController.searchForDoctors);
router.route('/subscribeToHealthPackage').post(patientController.subscribeToHealthPackage);
router.route('/viewDoctorSlots').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.viewDoctorSlots);
router.route('/viewPatientAppointments').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.viewPatientAppointments);


module.exports = router;
