const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
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
  hourlyRate: {
    type: Number,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  registrationStatus: {
    type: String,
    enum: ['pending', 'accepted', 'partially accepted'],
    default: 'pending',
  },
  speciality: {
    type: String,
    required: true,
  },
  registeredPatients: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Patient',
    },
  ],
  availableSlots: [
    {
      type: Date,
      default: null,
    },
  ],
  wallet: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
  },
});

doctorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
