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
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
