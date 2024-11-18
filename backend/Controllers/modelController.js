const Model = require('../Models/model');
const Manufacturer = require('../Models/Manufacturer');
const Memory = require('../Models/memory');
const { encrypt, decrypt } = require('../utils/encryption'); // Import encryption
const { Parser } = require('json2csv');
// Controller to save a new Model with manufacturer, memory, and prices
const createModel = async (req, res) => {
  try {
    const { name, manufacturerId, memoryId, priceWorking, priceDamaged, priceIncentive  } = req.body;

    
    // const manufacturer = await Manufacturer.findById(decrypt(manufacturerId));
    // const memory = await Memory.findById(decrypt(memoryId));  
    const manufacturer = await Manufacturer.findById(manufacturerId);
    const memory = await Memory.findById(memoryId);

    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }

    if (!memory) {
      return res.status(404).json({ error: 'Memory not found' });
    }

    const newModel = new Model({
      name,
      manufacturer: manufacturer._id,
      memory: memory._id,
      priceWorking,
      priceDamaged,
      priceIncentive,
    });

    await newModel.save();
    res.status(201).json({
      message: 'Model added successfully',
      model: { ...newModel._doc, _id: encrypt(newModel._id.toString()) },
    });
  } catch (error) {
    console.error('Error saving Model:', error);
    res.status(500).json({ error: 'Error saving Model' });
  }
};

// Get all models with manufacturer, memory, and price details
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find()
      .populate('manufacturer', 'name')
      .populate('memory', 'size');
      const encryptedModels = models.map(model => ({
        ...model._doc,
        _id: encrypt(model._id.toString()),
        // manufacturer: { ...model.manufacturer._doc, _id: encrypt(model.manufacturer._id.toString()) },
        // memory: { ...model.memory._doc, _id: encrypt(model.memory._id.toString()) },
      }));
  
      res.status(200).json(encryptedModels);
  } catch (error) {
    console.error('Error fetching Models:', error);
    res.status(500).json({ error: 'Error fetching Models' });
  }
};
const getModelsByManufacturer = async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    const models = await Model.find({ manufacturer: manufacturerId }).populate('memory', 'size');
    res.status(200).json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ error: 'Error fetching models' });
  }
};

// Update model (decrypting the ID)
const updateModel = async (req, res) => {
  try {
    const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    // const decryptedId = req.params.id; // Decrypt the encrypted ID
    const { name, manufacturerId, memoryId, priceWorking, priceDamaged, priceIncentive } = req.body;

    const updatedModel = await Model.findByIdAndUpdate(
      decryptedId, // Use decrypted ID
      {
        name,
        manufacturer: manufacturerId, // Decrypt manufacturer ID
        memory: memoryId, // Decrypt memory ID
        priceWorking,
        priceDamaged,
        priceIncentive,
      },
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.status(200).json({
      ...updatedModel._doc,
      _id: encrypt(updatedModel._id.toString()), // Encrypt ID for response
    });
  } catch (error) {
    console.error('Error updating Model:', error);
    res.status(500).json({ error: 'Error updating Model' });
  }
};
const   deleteModel= async (req, res) => {
  try {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    res.status(200).json({ message: 'Model deleted successfully' });
  } catch (error) {
    console.error('Error deleting Model:', error);
    res.status(500).json({ error: 'Error deleting Model' });
  }
}


// Controller function to get a model by ID
const getModelByID = async (req, res) => {
  try {
    const modelId = req.params.id;
    const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    // Find model by ID and populate manufacturer and memory details
    const model = await Model.findById(decryptedId)
      .populate('manufacturer', 'name') // Populate manufacturer with only the name field
      .populate('memory', 'size');      // Populate memory with only the size field

    // Check if model exists
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }

    res.json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const search1 = async (req, res) => {
  const searchQuery = req.query.q || ""; // Default to an empty string if searchQuery is undefined
  console.log("Search Query:", searchQuery); // This should log the search query or an empty string

  try {
    const models = await Model.aggregate([
      {
        $lookup: {
          from: 'manufacturers',
          localField: 'manufacturer',
          foreignField: '_id',
          as: 'manufacturerDetails'
        }
      },
      {
        $lookup: {
          from: 'memories',
          localField: 'memory',
          foreignField: '_id',
          as: 'memoryDetails'
        }
      },
      { $unwind: { path: '$manufacturerDetails', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$memoryDetails', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          combinedField: {
            $concat: [
              { $ifNull: ['$manufacturerDetails.name', ''] }, ' ',
              { $ifNull: ['$name', ''] }, ' - ',
              { $ifNull: ['$memoryDetails.size', ''] }
            ]
          }
        }
      },
      // Only add $match if searchQuery is not an empty string
      ...(searchQuery
        ? [
            {
              $match: {
                combinedField: { $regex: searchQuery, $options: 'i' }
              }
            }
          ]
        : []),
      {
        $project: {
          name: 1,
          priceWorking: 1,
          priceDamaged: 1,
          priceRecycle: 1,
          'manufacturerDetails.name': 1,
          'memoryDetails.size': 1
        }
      }
    ]);

    const encryptedModels = models.map(model => ({
      _id: encrypt(model._id.toString()),
      name: model.name,
      priceWorking: model.priceWorking,
      priceDamaged: model.priceDamaged,
      priceRecycle: model.priceRecycle,
      manufacturerDetails: model.manufacturerDetails,
      memoryDetails: model.memoryDetails
    }));

    console.log("Aggregation result:", encryptedModels); // Log the result of the aggregation
    res.json(encryptedModels);
  } catch (error) {
    console.error("Error in search function:", error); // Log the full error to debug
    res.status(500).json({ message: error.message });
  }
};
const getModelList = async (req, res) => {
  try {
    const models = await Model.find().populate('manufacturer', 'name').populate('memory', 'size');
    const modelList = models.map(model => ({
      id: model._id,
      name: `${model.manufacturer.name} ${model.name} - ${model.memory.size}`
    }));
    res.status(200).json(modelList);
  } catch (error) {
    console.error('Error fetching model list:', error);
    res.status(500).json({ error: 'Error fetching model list' });
  }
};

const generateSampleCSV1 = async (req, res) => {
  try {
    // Fetch models with necessary fields
    const models = await Model.find()
      .populate('manufacturer', 'name')
      .populate('memory', 'size');
      console.log(models); // Log the models to inspect the structure

    // Prepare data for CSV
    const sampleData = models.slice(0, 2).map(model => ({
      modelName: `${model.manufacturer.name} ${model.name} - ${model.memory.size}`,
      // modelId: encrypt(model._id.toString()),
      quantity: 1,
      // condition: 'Working', // Default condition
    }));

    // Define CSV fields
    const fields = [
      { label: 'Model Name', value: 'modelName' },
      // { label: 'Model ID', value: 'modelId' },
      { label: 'Quantity', value: 'quantity' },
      // { label: 'Condition (Working/Defective/Recycle)', value: 'condition' },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(sampleData);

    // Set headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.attachment('sample-trades.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).json({ error: 'Error generating CSV file' });
  }
};



module.exports = {
  createModel,
  getModelsByManufacturer,
  getAllModels,
  updateModel,
  deleteModel,
  search1,
  getModelByID,
  getModelList,
  generateSampleCSV1,
};

