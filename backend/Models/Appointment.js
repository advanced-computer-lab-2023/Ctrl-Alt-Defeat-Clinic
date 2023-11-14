const mongoose = require('mongoose');

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
});

appointmentSchema.index({ doctor: 1, date: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
