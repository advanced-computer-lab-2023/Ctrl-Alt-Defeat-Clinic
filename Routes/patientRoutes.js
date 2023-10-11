const express = require("express");
const patientController = require("../Controllers/patientController");
const { protect, restrictTo } = require("../Middlewares/authMiddlewares");

const router = express.Router();


router.route("/searchPatientsByName").get(patientController.searchPatientsByName);
router.route("/register").post(patientController.registerPatient);
router.route("/addMember/:id").post(patientController.addFamilyMember);
router.route("/viewFamilyMembers").get(patientController.viewFamilyMembers);
router.route("/viewPatients").get(patientController.viewAllPatients);

router.route("/viewDoctors/:username").get(patientController.viewAllDoctors);

module.exports = router;
