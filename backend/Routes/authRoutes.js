const express = require('express');
const authController = require('../Controllers/authController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/getMe', authMiddlewares.protect, authController.getMe);
router.post('/forgetPassword', authController.forgotPassword);
router.post('/verifyOTP/:username', authController.verifyOTP);
router.post('/resetPassword/:username', authController.resetPassword);
router.post('/changePassword', authMiddlewares.protect, authController.changePassword);

module.exports = router;
