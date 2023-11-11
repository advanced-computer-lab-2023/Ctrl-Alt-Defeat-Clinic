const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nationalId: {
    type: Number,
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
  relationToPatient: {
    type: String,
    enum: ['wife', 'husband', 'children'],
    required: true,
  },
  healthPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
});

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);

module.exports = FamilyMember;
