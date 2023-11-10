const express = require('express');
const doctorController = require('../Controllers/doctorController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(doctorController.registerDoctor);

router.route('/updateDoctor').put(doctorController.updateDoctor);

router.route('/viewPatients').get(doctorController.viewAllPatients);

router.route('/searchPatientsByName').get(authMiddlewares.protect, doctorController.searchPatientsByName);

router.route('/selectPatient').get(doctorController.selectPatient);

router.route('/doctordetails/:username').get(doctorController.viewDoctorDetails);

router.route('/viewAllDoctors').get(doctorController.viewAllDoctors);

router.route('/viewPatientInfo').get(doctorController.viewPatientInfo);

router.route('/filterDoctors').get(doctorController.filterDoctors);

router.route('/addAvailableSlot').put(authMiddlewares.protect, authMiddlewares.restrictTo('doctor'), doctorController.addAvailableSlot);

router.route('/viewDoctorAppointments').get(doctorController.viewDoctorAppointments);

module.exports = router;
