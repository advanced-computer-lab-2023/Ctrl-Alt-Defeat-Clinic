const express = require('express');
const appointmentController = require('../Controllers/appointmentController');
const filterController = require('../Controllers/filterController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/addAppointment').post(protect, restrictTo('patient'), appointmentController.addAppointment);
router.route('/filterAppointments').get(filterController.filterAppointments);
router.route('/filterPatients').get(filterController.filterPatients);
router.route('/filterDoctors').get(filterController.filterDoctors);
router
  .route('/rescheduleAppointment')
  .put(protect, restrictTo('patient', 'doctor'), appointmentController.rescheduleAppointment);
router
  .route('/cancelAppointment')
  .put(protect, restrictTo('patient', 'doctor'), appointmentController.cancelAppointment);
router.route('/my-doctors/:patient').get(protect, restrictTo('patient', 'doctor'), appointmentController.getMyDoctors);
router.route('/my-patients/:doctor').get(protect, restrictTo('patient', 'doctor'), appointmentController.getMyPatients);


module.exports = router;
