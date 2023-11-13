const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FamilyMember = require('./FamilyMember');

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  healthPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  familyMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: FamilyMember,
    },
  ],
});

patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
