// backend/models/memory.js
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // Example: '64GB', '128GB', '256GB'
  },
  { timestamps: true }
);

module.exports = mongoose.model('Memory', memorySchema);
