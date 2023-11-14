const express = require('express');
const multerUpload = require('../Middlewares/multerMiddleware');
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
router.route('/uploadFile').post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'),multerUpload, patientController.uploadFile);   
router.route('/deleteMedicalHistory').delete(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.deleteMedicalHistory);
router.route('/getAllMedicalHistory').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.getAllMedicalHistory);
router.route('/viewDoctorSlots').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.viewDoctorSlots);
router.route('/viewPatientAppointments').get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.viewPatientAppointments);
router
  .route('/subscribeToHealthPackage')
  .post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.subscribeToHealthPackage);
router.route('/cancelHealthPackage').post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.cancelHealthPackage);
router
  .route('/viewStatusOfHealthPackage')
  .get(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.getHealthPackageStatus);
router
  .route('/createCheckoutSessionForHp')
  .post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.createCheckoutSessionForHp);
router
  .route('/subscribeToHealthPackageByWallet')
  .post(authMiddlewares.protect, authMiddlewares.restrictTo('patient'), patientController.subscribeToHealthPackageByWallet);

module.exports = router;
