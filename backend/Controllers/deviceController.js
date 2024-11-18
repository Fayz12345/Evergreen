const Device = require('../Models/deviceModel');

// Get all devices
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new device
exports.addDevice = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json({ message: 'Device added successfully', newDevice });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing device
exports.updateDevice = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Device updated successfully', updatedDevice });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.searchDevices = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    
    const devices = await Device.aggregate([
      {
        $addFields: {
          combinedField: {
            $concat: [
              { $ifNull: ["$manufacturerName", ""] }, " ",
              { $ifNull: ["$modelName", ""] }, " ",
              { $ifNull: ["$memory", ""] }
            ]
          }
        }
      },
      {
        $match: {
          combinedField: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
        }
      }
    ]);

    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
