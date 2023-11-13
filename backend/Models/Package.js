const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discounts: {
    doctorSessionDiscount: {
      type: Number,
      required: true,
    },
    medicineDiscount: {
      type: Number,
      required: true,
    },
    familySubscriptionDiscount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed', 'cancelled'],
      default: 'unsubscribed',
      required: true,
    },
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
