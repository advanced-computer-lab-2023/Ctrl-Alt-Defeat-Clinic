const express = require('express');
const multerUpload = require('../Middlewares/multerMiddleware');
const patientController = require('../Controllers/patientController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(patientController.registerPatient);
router.route('/getAllPrescriptionsForPatient').get(patientController.getAllPrescriptionsForPatient);
router.route('/getPrescriptionById').get(patientController.getPrescriptionById);
router.route('/filterPrescriptions').get(patientController.filterPrescriptions);
router.route('/viewDoctors/:username').get(patientController.viewAllDoctors);
router.route('/searchForDoctors').get(patientController.searchForDoctors);
router.route('/register').post(patientController.registerPatient);
router
  .route('/addMember')
  .post(protect, restrictTo('patient'), patientController.addFamilyMember);
router
  .route('/linkMember')
  .post(protect, restrictTo('patient'), patientController.linkFamilyMember);
router
  .route('/viewFamilyMembers')
  .get(protect, restrictTo('patient'), patientController.viewFamilyMembers);

router.route('/uploadFile').post(protect, restrictTo('patient'),multerUpload, patientController.uploadFile);   
router.route('/deleteMedicalHistory').delete(protect, restrictTo('patient'), patientController.deleteMedicalHistory);
router.route('/getAllMedicalHistory').get(protect, restrictTo('patient'), patientController.getAllMedicalHistory);
router.route('/viewDoctorSlots').get(protect, restrictTo('patient'), patientController.viewDoctorSlots);
router.route('/viewPatientAppointments').get(protect, restrictTo('patient'), patientController.viewPatientAppointments);
router
  .route('/subscribeToHealthPackage')
  .post(protect, restrictTo('patient'), patientController.subscribeToHealthPackage);
router.route('/cancelHealthPackage').post(protect, restrictTo('patient'), patientController.cancelHealthPackage);
router
  .route('/viewStatusOfHealthPackage')
  .get(protect, restrictTo('patient'), patientController.getHealthPackageStatus);
router
  .route('/createCheckoutSessionForHp')
  .post(protect, restrictTo('patient'), patientController.createCheckoutSessionForHp);
router
  .route('/subscribeToHealthPackageByWallet')
  .post(protect, restrictTo('patient'), patientController.subscribeToHealthPackageByWallet);

module.exports = router;
