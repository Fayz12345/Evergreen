const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  batchNumber: { type: String, required: true }, // New field for unique batch number
  csvData: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      // Add other fields from CSV as needed
    }
  ],
  fileData: { type: Buffer, required: true },
  fileName: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Batch', batchSchema);
