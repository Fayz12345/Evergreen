const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  memory: { type: String, required: true },
  priceWorking: { type: Number, required: true },
  priceNonWorking: { type: Number, required: true },
  priceRecycle: { type: Number, default: 0 },
  image: { type: String },
}, { timestamps: true }); // Enable timestamps

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
