const Manufacturer = require('../Models/Manufacturer'); // Import the model
const { encrypt, decrypt } = require('../utils/encryption'); // Import encryption functions

// Controller to save a new manufacturer
const createManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    const newManufacturer = new Manufacturer({ name });
    await newManufacturer.save();
    res.status(201).json({
      message: 'Manufacturer saved successfully',
      // _id: encrypt(newManufacturer._id.toString()), // Encrypt ID for response
    });
  } catch (error) {
    console.error('Error saving manufacturer:', error);
    res.status(500).json({ error: 'Error saving manufacturer' });
  }
};

// Controller to get all manufacturers (encrypting their IDs)
const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find().sort({ createdAt: -1 });
    const encryptedManufacturers = manufacturers.map((manufacturer) => ({
      ...manufacturer._doc,
      // _id: encrypt(manufacturer._id.toString()), // Encrypt ID
    }));
    res.status(200).json(encryptedManufacturers);
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    res.status(500).json({ error: 'Error fetching manufacturers' });
  }
};

// Update a manufacturer (decrypting the ID from request)
const updateManufacturer = async (req, res) => {
  try {
    // const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    const decryptedId = req.params.id; // Decrypt the encrypted ID
    const { name } = req.body;

    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      decryptedId,
      { name },
      { new: true }
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.status(200).json({
      ...updatedManufacturer._doc,
      // _id: encrypt(updatedManufacturer._id.toString()), // Encrypt the updated ID
    });
  } catch (error) {
    console.error('Error updating manufacturer:', error);
    res.status(500).json({ error: 'Error updating manufacturer' });
  }
};

// Delete a manufacturer (decrypting the ID from request)
const deleteManufacturer = async (req, res) => {
  try {
    // const decryptedId = decrypt(req.params.id); // Decrypt the encrypted ID
    const decryptedId = req.params.id; // Decrypt the encrypted ID
    await Manufacturer.findByIdAndDelete(decryptedId);
    res.status(200).json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    console.error('Error deleting manufacturer:', error);
    res.status(500).json({ error: 'Error deleting manufacturer' });
  }
};

module.exports = {
  createManufacturer,
  getAllManufacturers,
  updateManufacturer,
  deleteManufacturer,
};
