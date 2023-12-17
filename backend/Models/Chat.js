const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
  {
    // chatName: { type: String, trim: true },
    patient: {
      type: String,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatModel);

module.exports = Chat;
