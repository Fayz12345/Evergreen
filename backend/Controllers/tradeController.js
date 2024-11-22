const { v4: uuidv4 } = require('uuid'); // Add this if you want to use UUID for unique batch numbers
const Trade = require('../Models/trade');
const Model = require('../Models/model');
const Customer = require('../Models/userModel'); 
const addedBy = require('../Models/userModel'); 
const { decrypt } = require('../utils/encryption'); // Import decrypt function
const csv = require('csv-parser');
const fs = require('fs');
const createTrade = async (req, res) => {
  try {
    const { modelId, customerId, quantity, condition, addedBy } = req.body;

    // Decrypt the encrypted IDs
    const decryptedModelId = decrypt(modelId);
    const decryptedCustomerId = decrypt(customerId);
    const decryptedAddedBy = decrypt(addedBy);

    // Fetch the model by decrypted ID
    const model = await Model.findById(decryptedModelId);
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }

    // Prepare prices based on model data
    const { priceWorking, priceDamaged, priceRecycle } = model;

    // Create new trade object
    const newTrade = new Trade({
      model: decryptedModelId,
      customer: decryptedCustomerId,
      quantity,
      condition,
      priceWorking,
      priceDamaged,
      priceRecycle,
      addedBy:decryptedAddedBy, // Assuming addedBy is directly available
    });

    // Save the new trade
    await newTrade.save();
    res.status(201).json({ message: 'Trade saved successfully', trade: newTrade });
  } catch (error) {
    // console.error('Error saving trade:', error);
    res.status(500).json({ error: 'Error saving trade' });
  }
};
const getAllTrades = async (req, res) => {
  try {
    const {  addedBy } = req.query;
    const filter = addedBy ? { addedBy } : {}; // Apply filter only if addedBy is provided

    const trades = await Trade.find(filter)
      .populate({
        path: 'model',
        populate: {
          path: 'memory', // Nested populate to fetch memory details
          select: 'size', // Only fetch the size field
        },
      })
      .populate('customer', 'fullName email') // Populate customer details
      .populate('addedBy', 'fullName email username'); // Populate Sales Rep (addedBy)


    res.status(200).json(trades);
  } catch (error) {
    // console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Error fetching trades' });
  }
};

  // Controller to update trade status
const updateTradeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedTrade = await Trade.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTrade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.status(200).json(updatedTrade);
  } catch (error) {
    // console.error('Error updating trade status:', error);
    res.status(500).json({ error: 'Error updating trade status' });
  }
};
const getTradeById = async (req, res) => {
  try {
    const { addedBy } = req.params;
    
   if (!addedBy) {
      return res.status(400).json({ error: 'Missing addedBy parameter' });
    }
    
    const decryptedAddedBy = decrypt(addedBy);
    // console.log(decryptedAddedBy);
    const trade = await Trade.find({ addedBy: decryptedAddedBy })
    .populate({
        path: 'model',
        populate:  [
          { path: 'memory', select: 'size' }, // Populate memory details
          { path: 'manufacturer', select: 'name' } // Populate manufacturer details
        ]
      })
      .populate('customer')
      .populate('addedBy');

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.status(200).json(trade);
  } catch (error) {
    // console.error('Error fetching trade by ID:', error);
    res.status(500).json({ error: 'Error fetching trade information' });
  }
};
const getTradeByCustomerId = async (req, res) => {
  try {
    const { addedBy } = req.params;
    if (!addedBy) {
      return res.status(400).json({ error: 'Missing addedBy parameter' });
    }

    const decryptedAddedBy = decrypt(addedBy);
    // console.log(decryptedAddedBy);

    const trade = await Trade.find({ addedBy: decryptedAddedBy })
      .populate('model')
      .populate('customer')
      .populate('addedBy');

    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.status(200).json(trade);
  } catch (error) {
    // console.error('Error fetching trade by ID:', error);
    res.status(500).json({ error: 'Error fetching trade information' });
  }
};

const getTradeCounts = async (req, res) => {
  // console.log("getTradeCounts function called");

  try {
    const tradeCounts = await Trade.aggregate([
      {
        $group: {
          _id: "$model",
          count: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "_id",
          as: "model",
        },
      },
      {
        $unwind: {
          path: "$model",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "manufacturers",
          localField: "model.manufacturer_id",
          foreignField: "_id",
          as: "manufacturer",
        },
      },
      {
        $unwind: {
          path: "$manufacturer",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$manufacturer.name",
          count: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 1,
          count: 1,
        },
      },
    ]);

    // console.log("Intermediate Result:", tradeCounts); // Debug the output to see manufacturer names
    res.status(200).json(tradeCounts);
  } catch (error) {
    // console.error("Error fetching trade counts:", error.message);
    res.status(500).json({ error: `Error fetching trade counts: ${error.message}` });
  }
};
const getAllTradesWithCount = async (req, res) => { 
  try {

    const trades = await Trade.find()
      .populate({
        path: 'model',
        populate: [
          {
            path: 'memory', // Populate memory details
            select: 'size', // Only fetch the size field
          },
          {
            path: 'manufacturer', // Populate manufacturer details within model
            select: 'name', // Only fetch the name field of manufacturer
          }
        ]
      })
      .populate('customer', 'fullName email') // Populate customer details
      .populate('addedBy', 'fullName email username'); // Populate Sales Rep (addedBy)

    res.status(200).json(trades);
  } catch (error) {
    // console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Error fetching trades' });
  }
};
const getTradeCountsByManufacturer = async (req, res) => {
  try {
    const tradeCounts = await Trade.aggregate([
      {
        $lookup: {
          from: 'models',
          localField: 'model',
          foreignField: '_id',
          as: 'model',
        },
      },
      { $unwind: '$model' },
      {
        $lookup: {
          from: 'manufacturers',
          localField: 'model.manufacturer',
          foreignField: '_id',
          as: 'manufacturer',
        },
      },
      { $unwind: '$manufacturer' },
      {
        $group: {
          _id: {
            category: {
              $cond: [
                { $eq: ['$manufacturer.name', 'Apple'] }, // Check if Apple
                'Apple',
                {
                  $cond: [
                    { $eq: ['$manufacturer.name', 'Samsung'] }, // Check if Samsung
                    'Samsung',
                    'Other', // All other manufacturers
                  ],
                },
              ],
            },
          },
          count: { $sum: 1 }, // Count trades for each category
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id.category',
          count: 1,
        },
      },
    ]);

    // Format the results to ensure all categories ("Apple", "Samsung", "Other") are present
    const result = tradeCounts.reduce(
      (acc, item) => {
        acc[item.category] = item.count;
        return acc;
      },
      { Apple: 0, Samsung: 0, Other: 0 }
    );

    res.status(200).json(result);
  } catch (error) {
    // console.error('Error fetching trade counts by manufacturer:', error);
    res.status(500).json({ error: 'Error fetching trade counts by manufacturer' });
  }
};

const batchUploadTrades = async (req, res) => {
  try {
    const { customerId, addedBy } = req.body;
    const decryptedcustomerId = decrypt(customerId);
    const decryptedaddedBy = decrypt(addedBy);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const trades = [];
    const tradePromises = [];
    const batchNo = uuidv4(); // Generate a unique batch number

    fs.createReadStream(file.path)
      .pipe(csv({
        mapHeaders: ({ header }) => {
          if (header === 'Model Name') return 'modelName';
          if (header === 'Model ID') return 'modelId';
          if (header === 'Quantity') return 'quantity';
          if (header === 'Condition (Working/Defective/Recycle)') return 'condition';
          return header;
        },
      }))
      .on('data', (row) => {
        tradePromises.push((async () => {
          try {
            const decryptedModelId = decrypt(row.modelId);
            const model = await Model.findById(decryptedModelId);

            if (model) {
              trades.push({
                model: decryptedModelId,
                customer: decryptedcustomerId,
                addedBy: decryptedaddedBy,
                quantity: parseInt(row.quantity, 10) || 1,
                condition: row.condition || 'Working',
                priceWorking: model.priceWorking,
                priceDamaged: model.priceDamaged,
                priceRecycle: model.priceRecycle,
                batchNo, // Add batch number to each trade
              });

            } else {
              // console.error(`Model not found for ID ${row.modelId}`);
            }
          } catch (innerError) {
            // console.error('Error in data row processing:', innerError);
          }
        })());
      })
      .on('end', async () => {
        try {
          await Promise.all(tradePromises);
          await Trade.insertMany(trades);
          res.status(201).json({ message: 'Batch upload successful', trades });
          // console.log('Batch upload successful');
        } catch (endError) {
          // console.error('Error during final insertion:', endError);
          res.status(500).json({ error: 'Error during batch upload finalization' });
        }
      })
      .on('error', (error) => {
        // console.error('Error processing CSV file:', error);
        res.status(500).json({ error: 'Error processing CSV file' });
      });
  } catch (error) {
    // console.error('Batch upload failed:', error);
    res.status(500).json({ error: 'Batch upload failed' });
  }
};

module.exports = { 
  createTrade, 
  getAllTrades, 
  updateTradeStatus, 
  getTradeById, 
  getTradeByCustomerId, 
  getTradeCounts , 
  getAllTradesWithCount, 
  getTradeCountsByManufacturer,
  batchUploadTrades

};
