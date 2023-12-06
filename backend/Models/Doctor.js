const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FamilyMember = require('./FamilyMember');

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
      _id: false,
      start: {
        type: Date,
        default: null,
      },
      end: {
        type: Date,
        default: function() {
          if (this.start) {
            return new Date(this.start.getTime() + 1 * 60 * 60 * 1000);
          }
          return null; // Or any other default value if 'start' is not defined
        },
      }
    },
  ],
  wallet: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
  },
  followUpRequests: [
    {
      _id: false,
      patient: {
        type: String,
        required: true,
      },
      familyMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: FamilyMember,
        default: null,
      },
      date: {
        type: Date,
        required: true,
      },
    }
  ],
});

doctorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
