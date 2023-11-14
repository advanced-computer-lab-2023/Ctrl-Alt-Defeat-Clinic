const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationalId: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  healthPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  healthPackageStatus: {
    type: String,
    enum: ['subscribed', 'unsubscribed', 'cancelled'],
    default: 'unsubscribed',
  },
  healthPackageRenewalDate: {
    type: Date,
  },
  healthPackageEndDate: {
    type: Date,
  },
  relationToPatient: {
    type: String,
    enum: ['wife', 'husband', 'children'],
    required: true,
  },
});

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);

module.exports = FamilyMember;
