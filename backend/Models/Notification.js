const mongoose = require('mongoose');

const notificationModel = mongoose.Schema(
  {
    receiver: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const notification = mongoose.model('Notification', notificationModel);

module.exports = notification;
