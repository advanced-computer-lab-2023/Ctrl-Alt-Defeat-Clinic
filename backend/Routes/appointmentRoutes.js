const express = require("express");
const appointmentController = require("../Controllers/appointmentController");
const filterController = require("../Controllers/filterController");
const authMiddlewares = require("../Middlewares/authMiddlewares");

const router = express.Router();

router.route("/addAppointment").post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), appointmentController.addAppointment);
router.route("/filterAppointments").get(filterController.filterAppointments);
router.route("/filterPatients").get(filterController.filterPatients);
router.route("/filterDoctors").get(filterController.filterDoctors);

module.exports = router;