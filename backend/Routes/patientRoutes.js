const express = require('express');
const multerUpload = require('../Middlewares/multerMiddleware');
const patientController = require('../Controllers/patientController');
const path = require('path');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(patientController.registerPatient);
router
  .route('/UploadMedicalDocuments')
  .post(protect, restrictTo('patient'), patientController.uploadPDocuments, patientController.uploadPatientDocuments);
router.route('/getAllPrescriptionsForPatient').get(patientController.getAllPrescriptionsForPatient);
router.route('/getPrescriptionById').get(patientController.getPrescriptionById);
router.route('/filterPrescriptions').get(patientController.filterPrescriptions);
router.route('/viewDoctors').get(protect, restrictTo('patient'), patientController.viewAllDoctors);
router.route('/searchForDoctors').get(patientController.searchForDoctors);
router.route('/uploadFile').post(protect, restrictTo('patient'), multerUpload, patientController.uploadFile);
router.route('/deleteMedicalHistory').delete(protect, restrictTo('patient'), patientController.deleteMedicalHistory);
router.route('/getAllMedicalHistory').get(protect, restrictTo('patient'), patientController.getAllMedicalHistory);
router.route('/viewDoctorSlots').get(protect, restrictTo('patient'), patientController.viewDoctorSlots);
router.route('/viewPatientAppointments').get(protect, restrictTo('patient'), patientController.viewPatientAppointments);
router.use('/uploads', protect, restrictTo('patient', 'doctor'), express.static(path.join(__dirname, '../uploads')));
router.route('/addMember').post(protect, restrictTo('patient'), patientController.addFamilyMember);
router.route('/linkMember').post(protect, restrictTo('patient'), patientController.linkFamilyMember);
router.route('/viewFamilyMembers').get(protect, restrictTo('patient'), patientController.viewFamilyMembers);
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

router.route('/requestFollowUp').put(protect, restrictTo('patient'), patientController.requestFollowUp);

router
  .route('/getPrescriptionsForPatient')
  .get(protect, restrictTo('patient'), patientController.getPrescriptionsForPatient);

module.exports = router;
