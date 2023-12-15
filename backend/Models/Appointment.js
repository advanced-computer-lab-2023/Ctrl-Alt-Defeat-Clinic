const mongoose = require('mongoose');
const FamilyMember = require('./FamilyMember');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled', 'rescheduled'],
    default: 'upcoming',
  },
  familyMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: FamilyMember,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  }
});

appointmentSchema.index({ doctor: 1, date: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
