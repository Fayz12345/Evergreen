const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid'); // For generating a unique batch number
const Batch = require('../Models/Batch');
const { decrypt } = require('../utils/encryption');
const { Parser } = require('json2csv'); // Install this if not available
exports.uploadBatch = async (req, res) => {
  try {
    const { customerId, addedBy } = req.body;
    const decryptedcustomerId = decrypt(customerId);
    const decryptedaddedBy = decrypt(addedBy);
    
    const batch = [];
    const batchNumber = uuidv4(); // Generate a unique batch number

    fs.createReadStream(req.file.path)
      .pipe(csv({
        mapHeaders: ({ header }) => {
            if (header === 'Model Name') return 'name';
            if (header === 'Model ID') return 'modelId';
            if (header === 'Quantity') return 'quantity';
            if (header === 'Condition (Working/Defective/Recycle)') return 'condition';
            return header;
          },
      }))
      .on('data', (row) => {
        if (row.name) {
          batch.push({
            name: row.name,
            quantity:row.quantity,
            batchNumber,
          });
        } else {
          // console.warn('Row missing "name" field:', row);
        }
      })
      .on('end', async () => {
        try {

            // console.log('Parsed batch data with batch number:', batch); // Log to confirm structure

            if (batch.length === 0) {
              throw new Error('No valid data rows with a name field were found in the CSV.');
            }
  
          // Read the file as binary data
          const fileBuffer = fs.readFileSync(req.file.path);

          // Create the batch document with fileData and csvData
          const newBatch = new Batch({
            csvData: batch,
            fileData: fileBuffer,
            fileName: req.file.originalname,
            batchNumber,
            addedBy: decryptedaddedBy,
            customerId: decryptedcustomerId,
          });

          // Save to MongoDB
          await newBatch.save();
          res.status(201).json({ message: 'Batch uploaded successfully', batchNumber });
        } catch (error) {
          // console.error('Error saving batch:', error);
          res.status(500).json({ error: 'Failed to save batch' });
        } finally {
          fs.unlinkSync(req.file.path); // Delete file after processing
        }
      });
  } catch (error) {
    // console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
};
// batchController.js

exports.getBatches = async (req, res) => {
  try {
    const batches = await Batch.find({ addedBy: decryptedAddedBy }).populate('addedBy', 'fullName').populate('customerId', 'fullName');
    res.status(200).json(batches);
  } catch (error) {
    // console.error('Error fetching batches:', error);
    res.status(500).json({ error: 'Failed to fetch batch data' });
  }
};

exports.getBatchesByAddedBy = async (req, res) => {
  try {
    const { addedBy } = req.params;
    if (!addedBy) {
      return res.status(400).json({ error: 'Missing addedBy parameter' });
    }

    const decryptedAddedBy = decrypt(addedBy);
    // console.log(decryptedAddedBy);
    const batches = await Batch.find({ addedBy: decryptedAddedBy }).populate('addedBy', 'fullName').populate('customerId', 'fullName');
    res.status(200).json(batches);
  } catch (error) {
    // console.error('Error fetching batches:', error);
    res.status(500).json({ error: 'Failed to fetch batch data' });
  }
};
exports.getBatchesByCustomer = async (req, res) => {
  try {
    // console.log(req.params);
    const { customerId } = req.params;
    // console.log('Customer id '+req.params);
    if (!customerId) {
      return res.status(400).json({ error: 'Missing customerId parameter' });
    }

    const decryptedcustomerId= decrypt(customerId);
    // console.log(decryptedcustomerId);
    const batches = await Batch.find({ customerId: decryptedcustomerId }).populate('addedBy', 'fullName').populate('customerId', 'fullName');
    res.status(200).json(batches);
  } catch (error) {
    // console.error('Error fetching batches:', error);
    res.status(500).json({ error: 'Failed to fetch batch data' });
  }
};
exports.downloadBatch = async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findById(batchId).populate('addedBy', 'fullName').populate('customerId', 'fullName');

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Prepare data for CSV
    const csvFields = ['name', 'quantity'];
    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(batch.csvData);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${batch.fileName || 'batch'}.csv`);
    res.send(csvData);
  } catch (error) {
    // console.error('Error generating CSV:', error);
    res.status(500).json({ error: 'Failed to download CSV' });
  }
};
