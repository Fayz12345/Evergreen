const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  fullName: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'User', required: false },
  avatar: { type: String },
  password: { type: String, required: true },
  phone: { type: String, required: false },
  username: { type: String, unique: true },
  disabled: { type: Boolean, default: false },
}, { timestamps: true, strict: true }); // Ensure strict mode is explicitly set


const User = mongoose.model('User', userSchema);

module.exports = User;
