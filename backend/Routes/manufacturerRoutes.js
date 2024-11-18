const express = require('express');
const {
  createManufacturer,
  getAllManufacturers,
  updateManufacturer,
  deleteManufacturer,
} = require('../Controllers/manufacturerController');

const router = express.Router();

router.post('/manufacturers', createManufacturer);
router.get('/manufacturers', getAllManufacturers);
router.put('/manufacturers/:id', updateManufacturer); // Update route
router.delete('/manufacturers/:id', deleteManufacturer); // Delete route

module.exports = router;
