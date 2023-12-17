const express = require('express');
const chatController = require('../Controllers/chatController');
const authMiddlewares = require('../Middlewares/authMiddlewares');

const router = express.Router();

router.get(
  '/search/:receiver',
  authMiddlewares.protect,
  authMiddlewares.restrictTo('doctor', 'patient'),
  chatController.getChat
);
router.get(
  '/my-chats',
  authMiddlewares.protect,
  authMiddlewares.restrictTo('doctor', 'patient'),
  chatController.getChatsByUserId
);
router.post(
  '/send-message',
  authMiddlewares.protect,
  authMiddlewares.restrictTo('doctor', 'patient'),
  chatController.sendMessage
);
router.get(
  '/:chatId',
  authMiddlewares.protect,
  authMiddlewares.restrictTo('doctor', 'patient'),
  chatController.getMessagesByChatId
);

module.exports = router;
