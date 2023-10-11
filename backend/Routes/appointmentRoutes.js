const express = require("express");
const appointmentController = require("../Controllers/appointmentController");
const filterController = require("../Controllers/filterController");

const router = express.Router();

router.route("/addAppointment").post(appointmentController.addAppointment);
router.route("/filterAppointments").get(filterController.filterAppointments);
router.route("/filterPatients").get(filterController.filterPatients);
router.route("/filterDoctors").get(filterController.filterDoctors);

module.exports = router;