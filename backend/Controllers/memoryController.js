// backend/controllers/memoryController.js
const Memory = require('../Models/memory');

const { encrypt, decrypt } = require('../utils/encryption'); // Import encryption
// Create a new memory option
const createMemory = async (req, res) => {
  try {
    const { size } = req.body;
    const newMemory = new Memory({ size });
    await newMemory.save();
    res.status(201).json({
      message: 'Memory added successfully',
      memory: { ...newMemory._doc, _id: encrypt(newMemory._id.toString()) }, // Encrypt ID
    });
  } catch (error) {
    // console.error('Error adding memory:', error);
    res.status(500).json({ error: 'Error adding memory' });
  }
};

// Get all memory options
const getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    const encryptedMemories = memories.map(memory => ({
      ...memory._doc,
      // _id: encrypt(memory._id.toString()), // Encrypt ID
    }));
    res.status(200).json(encryptedMemories);
  } catch (error) {
    // console.error('Error fetching memories:', error);
    res.status(500).json({ error: 'Error fetching memories' });
  }
};
const deleteMemory = async (req, res) => {
  // console.log(req.body);
  try {
    // console.log('Request params:', req.params); // Log to check if ID is received
    // const decryptedId = decrypt(req.params.id); // Decrypt the ID
    const Id = req.params.id; // Decrypt the ID

    const memory = await Memory.findByIdAndDelete(Id);
    if (!memory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.status(200).json({ message: 'Memory deleted successfully' });
  } catch (error) {
    // console.error('Error deleting memory:', error);
    res.status(500).json({ error: 'Error deleting memory' });
  }
};


const updateMemory = async (req, res) => {
  try {
    const { id } = req.params;
    const { size } = req.body;

    const updatedMemory = await Memory.findByIdAndUpdate(id, { size }, { new: true });
    if (!updatedMemory) {
      return res.status(404).json({ message: 'Memory not found' });
    }

    res.status(200).json({ message: 'Memory updated successfully', memory: updatedMemory });
  } catch (error) {
    // console.error('Error updating memory:', error);
    res.status(500).json({ error: 'Error updating memory' });
  }
};

module.exports = {
  createMemory,
  getAllMemories,
  deleteMemory,
  updateMemory,
};
