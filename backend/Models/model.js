const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    memory: { type: mongoose.Schema.Types.ObjectId, ref: 'Memory', required: true },
    priceWorking: { type: Number, required: true }, // Working price
    priceDamaged: { type: Number, required: true }, // Damaged price
    priceRecycle: { type: Number, default: 0, required: true }, // Recycle price (always 0)
    priceIncentive: { type: Number, required: true }, // Incentive price
  },
  { timestamps: true }
);

module.exports = mongoose.model('Model', modelSchema);
