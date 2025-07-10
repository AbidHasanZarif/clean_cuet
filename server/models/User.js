const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  varsity: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  hall: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UserSchema);