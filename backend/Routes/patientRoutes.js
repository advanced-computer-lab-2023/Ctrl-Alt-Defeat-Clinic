const express = require('express');
const patientController = require('../Controllers/patientController');
const { protect, restrictTo } = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.route('/register').post(patientController.registerPatient);
router.route('/addMember').post(patientController.addFamilyMember);
router.route('/viewFamilyMembers').get(patientController.viewFamilyMembers);
router.route('/getAllPrescriptionsForPatient').get(patientController.getAllPrescriptionsForPatient);
router.route('/getPrescriptionById').get(patientController.getPrescriptionById);
router.route('/filterPrescriptions').get(patientController.filterPrescriptions);
router.route('/viewDoctors/:username').get(patientController.viewAllDoctors);
router.route('/searchForDoctors').get(patientController.searchForDoctors);
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
