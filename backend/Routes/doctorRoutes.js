const express = require('express');
const doctorController = require('../Controllers/doctorController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(doctorController.registerDoctor);

router.route('/').put(protect, restrictTo('doctor'), doctorController.updateDoctor);

router.route('/selectPatient').get(doctorController.selectPatient);

router.route('/doctordetails').get(doctorController.viewDoctorDetails);

router.route('/viewAllDoctors').get(doctorController.viewAllDoctors);

router.route('/filterDoctors').get(doctorController.filterDoctors);
module.exports = router;
