const express = require('express');
const doctorController = require('../Controllers/doctorController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(doctorController.registerDoctor);

router.route('/updateDoctor').put(doctorController.updateDoctor);

router.route('/viewPatients').get(protect, restrictTo('doctor'),doctorController.viewAllPatients);

router.route('/searchPatientsByName').get(authMiddlewares.protect, doctorController.searchPatientsByName);

router.route('/selectPatient').get(doctorController.selectPatient);

router.route('/doctordetails/:username').get(doctorController.viewDoctorDetails);

router.route('/viewAllDoctors').get(authMiddlewares.protect, authMiddlewares.restrictTo('doctor', 'patient'), doctorController.viewAllDoctors);

router.route('/viewPatientInfo').get(doctorController.viewPatientInfo);

router.route('/filterDoctors').get(doctorController.filterDoctors);

router.route('/addAvailableSlot').put(authMiddlewares.protect, authMiddlewares.restrictTo('doctor'), doctorController.addAvailableSlot);

router.route('/viewDoctorAppointments').get(authMiddlewares.protect, authMiddlewares.restrictTo('doctor'),doctorController.viewDoctorAppointments);

router.route('/acceptContract').put(doctorController.acceptContract);

router.route('/scheduleFollowUp').put(protect, restrictTo('doctor'),doctorController.scheduleFollowUp);

router.route('/viewAvailableSlots').get(protect, restrictTo('doctor'),doctorController.viewAvailableSlots);

router.route('/addAvailableSlot').put(protect, restrictTo('doctor'),doctorController.addAvailableSlot);
module.exports = router;
