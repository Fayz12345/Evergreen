const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    model: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Model', 
      required: true 
    }, // Reference to Model collection
    customer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Correct reference to the User model
      required: true 
    }, // Reference to User collection for customers
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The admin or user who added the trade
      required: true,
    },
    statusChangedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // The admin or user who added the trade
      required: false,
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 1 
    }, // Number of devices traded
    condition: { 
      type: String, 
      enum: ['Working', 'Defective', 'Recycled'], 
      required: true 
    }, // Device condition
    priceWorking: { type: Number, required: true }, // Price if working
    priceDamaged: { type: Number, required: true }, // Price if defective
    priceRecycle: { type: Number, required: true }, // Price if recycled
    tradeDate: { 
      type: Date, 
      default: Date.now 
    } // Trade date
    ,
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    } // Approval status
    ,
    batchNo: { 
      type: String, 
      required: false 
    } // New field for batch number
  },
  { timestamps: true } // Mongoose will add createdAt and updatedAt fields
);

module.exports = mongoose.model('Trade', tradeSchema);
