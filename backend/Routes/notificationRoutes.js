const express = require('express');
const notificationController = require('../Controllers/notificationController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.post('/add', notificationController.addNotification);

router.get(
  '/:username',
  authMiddlewares.protect,
  authMiddlewares.restrictTo('doctor', 'patient'),
  notificationController.getNotificationsByUsername
);

module.exports = router;
