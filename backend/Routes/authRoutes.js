const express = require('express');
const authController = require('../Controllers/authController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/getMe', authMiddlewares.protect, authController.getMe);

module.exports = router;
